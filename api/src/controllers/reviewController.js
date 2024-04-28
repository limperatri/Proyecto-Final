const { Product, User, Category, Qa, Review, PurchaseOrder } = require('../db');
const { calcProdRating } = require('../middlewares/middlewares');

//Add Review to Product

const addReview = async (req, res) => {
    const { userId, orderId, producto } = req.body;
    const findOrder = await PurchaseOrder.findAll({
        where: { orderId: orderId },
    });
    if (!findOrder?.length)
        return res.status(400).send({ msg: "This order Id isn't valid" });
    // if (findOrder.orderStatus !== "accepted") return res.status(400).send({ msg: "The order must be accepted before being able to send a review" });

    try {
        for (var i = 0; i < producto.length; i++) {
            if (!producto[i].rating) continue;

            const product = await Product.findOne({
                where: { id: producto[i].id },
                include: {
                    model: Review,
                    attributes: ['rating', 'text'],
                    through: { attributes: [] },
                },
            });

            if (!product)
                return res
                    .status(400)
                    .send(`The product Id:  ${producto[i].id}  doesn't exist`);

            const user = await User.findOne({ where: { id: userId } });

            if (!user)
                return res
                    .status(400)
                    .send(`The user Id:  ${userId}  doesn't exist`);
            const fullReview = await Review.create({
                rating: producto[i].rating,
                text: producto[i].text,
                productId: product.id,
                userId: user.id,
            });

            product.addReview(fullReview);

            user.addReview(fullReview);

            await calcProdRating(producto[i].rating, product);
        }

        await findOrder.map(async (order) => {
            await PurchaseOrder.update(
                { review: true },
                { where: { orderId: order.orderId } }
            );
        });

        return res.status(200).send('Review Added');
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message });
    }
};

//Update Review
// router.put("/:reviewId/updateReview", async (req, res) => {
const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, text, userId } = req.body;

    try {
        const review = Review.findOne({ where: { id: reviewId } });
        const user = User.findOne({ where: { id: userId } });

        Review.update(
            {
                rating,
                text,
            },
            { where: { id: reviewId } }
        );
        return res.status(200).send('Review Updated');
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
};

module.exports = {
    addReview,
    updateReview,
};

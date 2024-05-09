import Cart from "../model/cart.model.js";
export const addbook = async(req, res) => {
    try {
        const { userid, booktitle, bookimage, price , status} = req.body;
        const createdCart = new Cart({
            userid: userid,
            booktitle: booktitle,
            bookimage: bookimage,
            price: price,
            status: status,
        });
        await createdCart.save();
        res.status(201).json({
            message: "Book Added to Cart successfully",
            cart: {
                _id: createdCart._id,
                booktitle: createdCart.booktitle,
                bookimage: createdCart.bookimage,
                price: createdCart.price,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const usercart = async(req, res) => {
    try {
        console.log("User Cart called");
        const { userid } = req.body;
        const cart = await Cart.find({ userid });
        if (cart === null) {
            return res.status(400).json({ message: "Cart is empty" });
        } else {
            res.status(200).json({
                message: "Cart fetched successfully",
                carts: cart.map(item => ({
                    userid: item.userid,
                    booktitle: item.booktitle,
                    bookimage: item.bookimage,
                    price: item.price,
                    status: item.status,
                  })),
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const removeItem = async(req, res) => {
    try {
        console.log("Remove Cart called");
        const { userid, booktitle } = req.body;
        await Cart.deleteMany({ userid, booktitle });
        const cart = await Cart.find({ userid });
        if (cart === null) {
            return res.status(400).json({ message: "Cart is empty" });
        } else {
            res.status(200).json({
                message: "Cart fetched successfully",
                carts: cart.map(item => ({
                    userid: item.userid,
                    booktitle: item.booktitle,
                    bookimage: item.bookimage,
                    price: item.price,
                    status: item.status,
                  })),
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
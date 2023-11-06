import { db } from "../Database"
import { Request, Response } from "express";

type SizesProps = {
    size: string,
    stock: string
}

export const getAllProducts = (req: Request, res: Response) => {
    const query = "SELECT * FROM products";

    db.query(query, (err: any, data: any) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
}

export const getProduct = (req: Request, res: Response) => {
    const { id } = req.params
    const query = "SELECT * FROM products WHERE product_id = ?"

    db.query(query, [id], (err: any, pData: any) => {
        if (err) return res.json(err);


        if (pData[0].product_type === 'footwear') {
            const fQuery = `SELECT DISTINCT footwear_size, footwear_stock FROM footwears INNER JOIN products ON footwears.product_id = ?`

            db.query(fQuery, [id], (err: any, fData: any) => {

                return res.status(201).json({ ...pData, sizes: fData });
            })
        }
        else return res.status(200).json(pData);
    })
}

export const registerProduct = (req: Request, res: Response) => {
    const productQuery = "INSERT INTO products (`product_name`, `product_type`, `product_brand`, `product_price`, `product_image`) VALUES (?)";

    const values = [
        req.body.product,
        req.body.category,
        req.body.brand,
        parseFloat(req.body.price),
        `http://localhost:3300/product/image/${req.file?.filename}`
    ]

    const sizes = JSON.parse(req.body.sizes).map(obj => {
        if (obj.size !== false) {
            if (obj.stock === "") obj.stock = 0
            return obj
        }
    }).filter(item => item !== undefined)

    db.query(productQuery, [values], (pErr: any, pData: any) => {
        if (pErr) return res.json(pErr);

        if (req.body.category === 'footwear') {
            const footwearQuery = "INSERT INTO footwears (`footwear_size`, `footwear_stock`, `product_id`) VALUES (?)"
            let size: SizesProps
            for (size of sizes) {

                const values = [size.size, size.stock, pData.insertId]

                db.query(footwearQuery, [values], (fErr: any, fData: any) => {
                    if (fErr) return res.json(fErr);

                })
            }
        }

        return res.status(200).json("Produto cadastrado com sucesso!");
    })

}

export const updateProduct = (req: Request, res: Response) => {
    const query = "UPDATE products SET `product` = ?, `category` = ?, `brand` = ?, `price` = ? WHERE `product_id` = ?"

    const values = [
        req.body.product,
        req.body.category,
        req.body.brand,
        parseFloat(req.body.price),
    ]

    db.query(query, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto Atualizado com sucesso!");
    });

}

export const deleteProduct = (req: Request, res: Response) => {
    const query = "DELETE FROM products WHERE product_id = ?"

    db.query(query, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Produto deletado com sucesso!");
    });

}
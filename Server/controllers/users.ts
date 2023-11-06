import { db } from "../Database"
import { Request, Response } from "express"
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import { VerifyErrors } from "jsonwebtoken";


type Users = {
    users_id: number,
    users_name: string | null,
    users_image: null,
    users_email: string | null,
    users_number: string | null,
    users_cep: string | null,
    users_country: string | null,
    users_state: string | null,
    users_city: string | null,
    users_nbh: string | null,
    users_address: string | null,
    users_address_complement: string | null
}

const generateToken = (userKeys: Users) => {
    const token = jwt.sign({ userKeys }, 'secretpassword', { expiresIn: 60 * 60 });// 1h
    return token;
}

export const checkToken = (req: Request, res: Response) => {
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, 'secretpassword', (err: VerifyErrors | null, decoded: any) => {

        if (err) {
            return res.json('Token inválido ou expirado.');
        }

        const newToken = generateToken(decoded.userKeys);

        res.status(200).json({ token: newToken, user: decoded.userKeys });
    })

}

export const getUsers = (req: Request, res: Response) => {
    const query = "SELECT * FROM users WHERE users_login = ? AND users_password = ?";

    const values = [
        req.body.login,
        req.body.password
    ]

    db.query(query, values, (err, data: any) => {
        if (err) return res.json(err);

        if (data[0]) {
            let value: any = {}

            for (const key in data[0]) {
                if (key === "users_login" || key === "users_password") continue

                value[key] = data[0][key];
            }

            const id = value.users_id; // lógica para mover o id para o fundo do objeto.
            delete value.users_id;
            value.users_id = id;


            const token = generateToken(value as Users);

            return res.status(200).json(
                {
                    token: token,
                    user: data[0]
                });
        } else {
            return res.status(404).json({ message: "Invalid Credentials." })
        }

    })

}

export const postUsers = (req: Request, res: Response) => {

    const query = "INSERT INTO users(`users_login`, `users_password`) VALUES (?)";
    const values = [
        req.body.login,
        req.body.password
    ]

    db.query(query, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário Cadastrado com Sucesso!");
    });
}

export const updateUser = (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (!token) return res.json("token não encontrado.");

    jwt.verify(token, 'secretpassword', (err: VerifyErrors | null, decoded: any) => {
        const tokenData = decoded.userKeys;
        
        let avatar = '';
        if (req.file) {
            avatar = `http://localhost:3300/user/image/${req.file.filename}`
        } else {
            avatar = tokenData.users_image;
        }

        const values = [
            req.body.name,
            avatar,
            req.body.email,
            req.body.cel,
            req.body.cep,
            req.body.country,
            req.body.city,
            req.body.state,
            req.body.nbh,
            req.body.address,
            req.body.complement,
            tokenData.users_id,
            tokenData.isAdmin
        ]

        let newValues: string[] = [];
        for (const key in tokenData) {
            if (tokenData[key] !== "" && (values[Object.keys(tokenData).indexOf(key)] === ""
                || values[Object.keys(tokenData).indexOf(key)] === 'undefined'))
                newValues.push(tokenData[key]);

            else if (tokenData)
                newValues.push(values[Object.keys(tokenData).indexOf(key)]);
        }
        console.log(newValues)
        const query = 'UPDATE `users` SET `users_name` = ?, `users_image` = ?,' +
            '`users_email` = ?, `users_number` = ?, `users_cep` = ?, `users_country` = ?,' +
            '`users_state` = ?, `users_city` = ?, `users_nbh`= ?, `users_address` = ?,' +
            '`users_address_complement` = ? WHERE `users_id` = ?';

        db.query(query, newValues, (err) => {
            if (err) return res.json(err);

            let newTokenData = tokenData;

            for (const key in newTokenData) {
                newTokenData[key] = newValues[Object.keys(newTokenData).indexOf(key)]
            }
            
            const newToken = generateToken(newTokenData);

            console.log("Usuário Atualizado!");
            return res.status(200).json({
                message: 'Usuário Atualizado.',
                token: newToken,
            });
        })
    })
}
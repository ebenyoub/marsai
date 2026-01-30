import { Request, Response } from "express";
import User from "../models/user.model.js";

interface User {
    "id": number,
    "firstname": string,
    "lastname": string,
    "email": string,
    "password": string,
    "created_at": string,
    "updated_at": string,
    "festival_id": number
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const results = await User.findAll() as User[];

        if (results.length > 0) {
            return res.json({
                success: true,
                data: results,
            });
        }

        return res.json({
            success: false,
            message: "Aucun utilisateur dans la base de donnée"
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs : ", error)

        return res.json({
            success: false,
            message: "Une erreur interne est survenue sur le serveur."
        })
    }

}

const getOneUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const results = await User.findOne(id) as User[];

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Cet utilisateur est introuvable"
            })
        }
            return res.status(200).json({
                success: true,
                data: results,
            });

    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs : ", error)

        return res.status(500).json({
            success: false,
            message: "Une erreur interne est survenue sur le serveur."
        });
    }
}

export default {
    getAllUsers,
    getOneUser
}
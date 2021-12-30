import express from "express";
import { 
    crudCharacter,
} from "../crud";

export const charactersRoute = express.Router();

/**
 * Return all characters with all their stats, moves...
 */
charactersRoute.get("/full", async (req, res): Promise<void> => {
    try {
        const characters = await crudCharacter.getMulti();

        res.send(characters);
    }
    catch (error: unknown) {
        console.log(error);
        res.send("There was an error while retrieving all characters");
    }
});

/**
 * Return all characters with just the basics informations
 */
charactersRoute.get("/short", async (req, res): Promise<void> => {
    try {
        const characters = await crudCharacter.getMulti();

        res.send(characters);
    }
    catch (error: unknown) {
        console.log(error);
        res.send("There was an error while retrieving all characters");
    }
});

/**
 * Return a character with all their stats, moves... depending on the id
 * @params id
 */
charactersRoute.get("/full/:id", async (req, res): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        const character = await crudCharacter.get(id);
        
        if (character) { 
            res.send(character);
        }else {
            res.status(404).send("There is no character with this id");
        }
    }
    catch (error: unknown) {
        console.log(error);
        res.send("There was an error while retrieving this character");
    }
});

/**
 * Return a character with just the basics informations depending on the id
 * @params id
 */
charactersRoute.get("/short/:id", async (req, res): Promise<void> => {
    const id = parseInt(req.params.id);

    try {
        const character = await crudCharacter.get(id);
        
        if (character) { 
            res.send(character);
        }else {
            res.status(404).send("There is no character with this id");
        }
    }
    catch (error: unknown) {
        console.log(error);
        res.send("There was an error while retrieving this character");
    }
});
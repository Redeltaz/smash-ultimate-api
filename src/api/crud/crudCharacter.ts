import CRUDBase from "./crudBase";
import { 
    Character,
    CharacterDB
} from "../../interfaces";

class CRUDCharacter extends CRUDBase<Character, CharacterDB> {

    constructor(label: string) {
        super(label);
    }

}

export const crudCharacter = new CRUDCharacter("Character");
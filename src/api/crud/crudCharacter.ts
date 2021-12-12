import CRUDBase from "./crudBase";

class CRUDCharacter extends CRUDBase {

    constructor(label: string) {
        super(label);
    }

}

export const crudCharacter = new CRUDCharacter("Character");
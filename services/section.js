var SequelizeBot = require('./../models/db');

class SectionServices {

    /**
     * return sections for given class
     * @param {number} classId- Provide the id of the class
     */
    async getSection(classId) {

        /* return null in the callback if invalid username or password */
        if (!classId) {
            throw Error(`Passed invalid classroom`);
        }

        /* Update given class for field with provided value */
        const sections = await SequelizeBot.Section.findAll({
            where: { class_id: classId }
        });

        return sections;
    };


    /**
     * Create section for class
     * @param {number} classId- Provide the id of the classroom
     */
    async createSection(classId, name, color) {

        /* return null in the callback if invalid username or password */
        if (!classId || !name || !color) {
            throw Error(`Passed invalid ${!classId ? 'classroom' : (!name ? 'name' : 'color')}`);
        }

        /* create class for classroom with given name */
        const newSection = await SequelizeBot.Section.create({
            class_id: classId,
            name: name,
            color: color
        });

        return newSection;
    };

    /**
     * remove section
     * @param {number} sectionId- Provide the id of the class
     */
    async removeSection(sectionId) {

        /* return null in the callback if invalid username or password */
        if (!sectionId) {
            throw Error(`Passed invalid section`);
        }

        /* remove class for given */
        await SequelizeBot.Section.destroy({
            where: { id: sectionId }
        });

        return true;
    };

    /**
     * remove provided class
     * @param {number} sectionId- Provide the id of the class
     */
    async updateSection(sectionId, field, value) {

        /* return null in the callback if invalid username or password */
        if (!sectionId) {
            throw Error(`Passed invalid classroom`);
        }

        /* Update given class for field with provided value */
        const [numRows, rows] = await SequelizeBot.Section.update(
            { [field]: value },
            { where: { id: sectionId } }
        );

        return numRows;
    };
}

module.exports = new SectionServices();
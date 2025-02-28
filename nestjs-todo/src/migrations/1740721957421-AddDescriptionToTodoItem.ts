import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToTodoItem1740721957421 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE todo_item ADD COLUMN description VARCHAR(255)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE todo_item DROP COLUMN description`
        );
    }

}

class Bombs extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.physicsWorld, config.scene);
        this.addBomb();
    }

    addBomb() {
        this.create(
            Phaser.Math.Between(40, this.scene.scale.width - 40)
            , -10, 'virus',Phaser.Math.Between(0, 3))
            .setDepth(2)
            .setBounce(1)
            .setCircle(14)
            .setVelocityX(
                (Phaser.Math.Between(0, 1)) ? 100 : -100
            )
            .setGravityY(-1800)
            .setCollideWorldBounds(true);
    }
    destroyItem() {
        if(this.getChildren().length == 11){
        this.clear(true,true);
        }
        // this.children.entries[0].destroy();
        
        // this.addTomatoItem();
    }

    update() {
        this.children.iterate( bomb => {
            if(bomb.body.velocity.x < 0) {
                bomb.setAngularVelocity(-300);
            } else {
                bomb.setAngularVelocity(300);
            }
        });
    }
}

export default Bombs;
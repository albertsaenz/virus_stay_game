class Covid extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.physicsWorld, config.scene);
        this.addCovid();
    }

    addCovid() {
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
        if(this.getChildren().length == 10){
        this.clear(true,true);
        }
    }

    update() {
        this.children.iterate( covid => {
            if(covid.body.velocity.x < 0) {
                covid.setAngularVelocity(-300);
            } else {
                covid.setAngularVelocity(300);
            }
        });
    }
}

export default Covid;
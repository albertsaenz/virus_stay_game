class TomatoItem extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.physicsWorld, config.scene); 
        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.addTomatoItem();
    }

    addTomatoItem() {
        this.create(
            Phaser.Math.Between(0, this.scene.scale.width),
            Phaser.Math.Between(0, this.scene.scale.height-90),
            'amigos',Phaser.Math.Between(0, 6)
        ).setCollideWorldBounds(true).setScale(2).setSize(15,28).setOffset(7,4);
    }

    destroyItem() {
        this.children.entries[0].destroy();
        this.addTomatoItem();
    }

}

export default TomatoItem;
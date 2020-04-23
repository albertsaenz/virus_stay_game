class PildoraItem extends Phaser.Physics.Arcade.Group {
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
            Phaser.Math.Between(0, this.scene.scale.height-64),
            'pildora',Phaser.Math.Between(0, 6)
        ).setCollideWorldBounds(true).setScale(1).setSize(27,30).setOffset(3,1);
    }

    destroyItem() {
        this.children.entries[0].destroy();
        this.addTomatoItem();
    }

}

export default PildoraItem;
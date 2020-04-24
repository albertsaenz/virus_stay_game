class AmigoItem extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.physicsWorld, config.scene); 
        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.addAmigoItem();
        
    }

    addAmigoItem() {
        this.grito_random=Phaser.Math.Between(0, 6);
        this.create(
            Phaser.Math.Between(0, this.scene.scale.width),
            Phaser.Math.Between(0, this.scene.scale.height-90),
            'amigos',this.grito_random
        ).setCollideWorldBounds(true).setScale(2).setSize(15,28).setOffset(7,4);
    }

    destroyItem() {
        this.children.entries[0].destroy();
        this.addAmigoItem();
    }

    grito(){
            if(this.grito_random <=3){

                this.scene.sound.play('no_me_toques',{volume: 0.02});
            }else{

                this.scene.sound.play('nou',{volume: 0.02});
            }

    }

}

export default AmigoItem;
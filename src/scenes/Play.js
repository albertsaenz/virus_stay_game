import Persona from "../Player/Persona.js";
import Bombs from '../Objects/Bombs.js';
import TomatoItem from '../Objects/TomatoItem.js';
import PildoraItem from '../Objects/PildoraItem.js';
class Play extends Phaser.Scene {
    constructor() {
        super({key: 'Play'});
    }
    init() {
        console.log('Se ha iniciado la escena Play');
        this.scene.launch('UI');
    }

    create(){
        // this.add.image(-75,-40,'fciudad').setOrigin(0).setScale(0.7);
        this.add.image(-75,-100,'fondo').setOrigin(0).setScale(0.7);
        // this.add.image(-75,-100,'fondo2').setOrigin(0).setScale(0.7);

        this.persona= new Persona({
            scene: this,
            x:30,
            y:290,
        });
        

        this.plataformas= this.physics.add.staticGroup();
        this.plataformas.create(0,220,'plataforma2').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(50,307,'plataforma2').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(215,70,'plataforma2').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(190,230,'plataforma2').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(429,80,'plataforma2').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(435,230,'plataforma2').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(535,80,'plataforma2').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(535,180,'plataforma2').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(535,320,'plataforma2').setScale(1.1).setOrigin(0).refreshBody();
        // this.plataformas.create(250,250,'plataforma').setScale(1.1).setOrigin(0).refreshBody();

        this.plataformas_movibles= this.physics.add.group();
        this.plataformas_movible_dos=this.physics.add.sprite(160,67,'plataforma').setScale(1.1);
        this.plataformas_movible_uno=this.physics.add.sprite(375,77,'plataforma').setScale(1.1);
        this.plataformas_movibles.add(this.plataformas_movible_uno);
        this.plataformas_movibles.add(this.plataformas_movible_dos);
        // this.plt.body.setAllowGravity(false);

        
        this.tweens= this.add.tween({
            targets:this.plataformas_movible_uno,
            y:350,
            repeat:-1,
            duration:3000,
            yoyo:true,
            // ease:'Power1'
        });
        this.tweens= this.add.tween({
            targets:this.plataformas_movible_dos,
            y:180,
            repeat:-1,
            duration:1000,
            yoyo:true,
            // ease:'Power1'
        });
        this.plataformas_movibles.children.iterate((plataforma)=>{

            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
        });

        this.bombsGroup = new Bombs({
            physicsWorld: this.physics.world,
            scene: this
        });
        // this.physics.add.collider([this.persona,]);
        this.physics.add.overlap(this.persona, this.bombsGroup, () => {
            this.persona.bombCollision();
        });

        

        this.itemsGroup = new TomatoItem({
            physicsWorld: this.physics.world,
            scene: this
        });

        this.itemsPildoraGroup = new PildoraItem({
            physicsWorld: this.physics.world,
            scene: this
        });
        this.physics.add.overlap(this.persona, this.itemsPildoraGroup, () => {
            this.persona.pildoraCollision();
            this.itemsPildoraGroup.destroyItem();
        });
        // this.physics.add.collider([this.persona],this.wall_floor);
        this.physics.add.collider([this.bombsGroup,this.itemsGroup,this.persona,this.itemsPildoraGroup],[this.plataformas_movibles,this.plataformas]);
        // this.physics.add.collider([this.virus_morado,this.bombsGroup,this.persona,this.itemsGroup],[this.plataformas]);
        this.physics.add.collider([this.persona],[this.plataformas_movibles],()=>{
            this.persona.plataforma();
        });
        this.physics.add.overlap(this.itemsGroup, this.persona, () => {
            // this.sound.play('pop');
            this.registry.events.emit('update_points');
            this.itemsGroup.destroyItem();
            this.bombsGroup.addBomb();
            this.bombsGroup.destroyItem();
            
            
        });
        
        this.physics.world.setBoundsCollision(true, true, false, true);
    }

    update(){
        this.persona.update();
        this.bombsGroup.update();
    }
}
export default Play;
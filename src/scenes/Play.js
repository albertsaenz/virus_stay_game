import Persona from "../Player/Persona.js";
import Covid from '../Objects/Covid.js';
import AmigoItem from '../Objects/AmigoItem.js';
import PildoraItem from '../Objects/PildoraItem.js';
class Play extends Phaser.Scene {
    constructor() {
        super({key: 'Play'});
    }
    init() {
        this.scene.launch('UI');
    }

    create(){
        this.add.image(-75,-100,'fondo').setOrigin(0).setScale(0.7);

        this.persona= new Persona({
            scene: this,
            x:30,
            y:290,
        });

        this.plataformas= this.physics.add.staticGroup();
        this.plataformas.create(2,220,'plataforma').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(50,307,'plataforma').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(215,70,'plataforma').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(190,230,'plataforma').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(429,80,'plataforma').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(433,230,'plataforma').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(532,80,'plataforma').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(532,180,'plataforma').setScale(1.1).setOrigin(0).refreshBody();
        this.plataformas.create(532,320,'plataforma').setScale(1.1).setOrigin(0).refreshBody();

        this.plataformas_movibles= this.physics.add.group();
        this.plataformas_movible_dos=this.physics.add.sprite(160,67,'plataforma_movible').setScale(1.1);
        this.plataformas_movible_uno=this.physics.add.sprite(375,77,'plataforma_movible').setScale(1.1);
        this.plataformas_movibles.add(this.plataformas_movible_uno);
        this.plataformas_movibles.add(this.plataformas_movible_dos);
        
        this.tweens= this.add.tween({
            targets:this.plataformas_movible_uno,
            y:350,
            repeat:-1,
            duration:3000,
            yoyo:true,
        });

        this.tweens= this.add.tween({
            targets:this.plataformas_movible_dos,
            y:180,
            repeat:-1,
            duration:1000,
            yoyo:true,
        });
        this.plataformas_movibles.children.iterate((plataforma)=>{

            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
        });

        this.covidGroup = new Covid({
            physicsWorld: this.physics.world,
            scene: this
        });

        this.physics.add.overlap(this.persona, this.covidGroup, () => {
            this.persona.covidCollision();
        });

        this.amigosGroup = new AmigoItem({
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
            this.sound.play('item_drop',{volume: 0.08,});
        });

        this.physics.add.collider([this.covidGroup,this.amigosGroup,this.persona,this.itemsPildoraGroup],[this.plataformas_movibles,this.plataformas]);
        this.physics.add.collider([this.persona],[this.plataformas_movibles],()=>{
            this.persona.plataforma();
        });

        this.physics.add.overlap(this.amigosGroup, this.persona, () => {
            this.registry.events.emit('update_points');
            this.amigosGroup.grito();
            this.amigosGroup.destroyItem();
            this.covidGroup.addCovid();
            this.covidGroup.destroyItem();
        });
        
        this.physics.world.setBoundsCollision(true, true, false, true);
    }

    update(){
        this.persona.update();
        this.covidGroup.update();
    }
}
export default Play;
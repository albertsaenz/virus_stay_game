class Persona extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene, config.x, config.y, 'persona');

        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setScale(2.3);
        this.body.setSize(15,28);
        this.body.setOffset(7,4);

        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.jumping = false;
        this.atack= false;

        this.anims.play('persona_idle');
        this.prevMov='persona_idle';

        this.hitDelay=false;

        this.cursor = this.scene.input.keyboard.createCursorKeys();

        this.life = 3;
        // this.cursor.space.on("down",()=>{});
        
    }
    plataforma(){
        this.jumping=false;
    }
    update(){
        if(this.cursor.left.isDown){
            this.body.setVelocityX(-200);
            this.flipX= true;
            this.body.setSize(15,28);
            this.body.setOffset(10,4);
            if(this.prevMov !== 'left' && !this.jumping){
                this.prevMov = 'left';
                this.anims.play('persona_walk');
            }
        } else if(this.cursor.right.isDown){
            this.body.setVelocityX(200);
            this.flipX= false;
            this.body.setSize(15,28);
            this.body.setOffset(7,4);
            if(this.prevMov !== 'right' && !this.jumping){
                this.prevMov = 'right';
                this.anims.play('persona_walk');
            }
        }
        else {
            this.body.setVelocityX(0);
            if(this.prevMov !== 'persona_idle' && !this.jumping){
                this.prevMov = 'persona_idle';
                this.anims.play('persona_idle');
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursor.up) && !this.jumping && this.body.blocked.down){
            this.jumping = true;
            this.body.setVelocityY(-560);
            if(this.prevMov !== 'jump'){
                this.prevMov = 'jump';
                this.anims.play('persona_jump');
            }
        } else if(this.body.blocked.down){
            this.jumping = false;
        }
        
        // if(Phaser.Input.Keyboard.JustDown(this.cursor.space)&& !this.jumping &&!this.atack){
        //     if(this.prevMov !== 'space' ){
        //         this.anims.play('Persona_attack_sword');
        //         this.atack= true;
        //         this.scene.time.addEvent({
        //             delay: 650,
        //             callback:()=>{
        //                 this.prevMov = 'space';
        //                 this.atack= false;
        //             }
        //         });
        //     }
        // }
        


        
    }
    bombCollision() {
        if(!this.hitDelay) {
            this.hitDelay = true;

            // this.scene.sound.play('draw');
            this.life--;
            this.scene.registry.events.emit('remove_life');

            if(this.life === 0) {
                this.scene.registry.events.emit('game_over');
            }

            this.setTint(0x1abc9c);
            this.scene.time.addEvent({
                delay: 600,
                callback: () => {
                    this.hitDelay = false;
                    this.clearTint();
                }
            });
        }
    }

    pildoraCollision() {
        if(this.life < 3){
            this.life++;
            this.scene.registry.events.emit('add_life');
        }else if(this.life >= 3){

        }
      
    }
}

export default Persona;
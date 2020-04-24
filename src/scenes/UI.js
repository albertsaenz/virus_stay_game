class UI extends Phaser.Scene {
    constructor() {
        super({key: 'UI'});
    }
    
    init() {
        this.scene.moveUp();
        this.actual_points = 0;
    }

    create() {
        this.groupLife = this.add.group({
            key: 'heart',
            repeat: 2,
            setXY: {
                x: 40,
                y: 20,
                stepX: 25
            },
            setScale:{
                x:1.06
            }
        });

        this.points = this.add.bitmapText(
            this.scale.width - 40,
            20,
            'pixelFont',
            Phaser.Utils.String.Pad('0', 6, '0', 1)
        ).setOrigin(1, 0).setTint(0xffffff);

        // Eventos
        this.registry.events.on('remove_life', () => {
            this.groupLife.getChildren()[this.groupLife.getChildren().length - 1].destroy();
        });
        this.registry.events.on('add_life', () => {

            this.corazon=this.groupLife.getChildren()[this.groupLife.getChildren().length - 1];
            this.groupLife.create(this.corazon.x+25,this.corazon.y,'heart');
        });

        this.registry.events.on('game_over', () => {
            
            this.sound.play('game_over',{volume: 0.08,});
            this.registry.events.removeAllListeners();
            this.scene.start('Menu', {points: this.actual_points});
        });

        this.registry.events.on('update_points', () => {
            this.actual_points += 10;
            this.points.setText(Phaser.Utils.String.Pad(this.actual_points, 6, '0', 1));
        });
    }
}

export default UI;
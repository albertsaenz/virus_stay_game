class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu'
        });
    }

    init(data) {
        this.points = 0;

        if(Object.keys(data).length !== 0) {
            this.points = data.points;
        }
    }

    create() {
        const pointsDB = localStorage.getItem('best_points');
        this.betsPoints = (pointsDB !== null) ? pointsDB : 0;

        this.add.image(0, 0, 'fondo').setOrigin(0);

        this.logoMenu = this.add.image(
            this.scale.width/2,
            (this.scale.height/2)-80,
            'logo'
        ).setScale(2).setInteractive();

        this.play = this.add.image(
            this.scale.width/2,
            (this.scale.height/2)+120,
            'play'
        ).setScale(1).setInteractive();
        
        this.pointsText = this.add.bitmapText(
            this.scale.width/2,
            this.scale.height - 160,
            'pixelFont',
            'PUNTOS ' + this.points
        ).setDepth(2).setOrigin(0.5);

        this.bestPointsText = this.add.bitmapText(
            this.scale.width/2,
            this.scale.height - 130,
            'pixelFont',
            'MEJOR  ' + this.betsPoints
        ).setDepth(2).setOrigin(0.5);

        this.play.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.logoMenu,
                ease: 'Bounce.easeIn',
                y: -200,
                duration: 1000
            });
           
            this.add.tween({
                targets: [ this.pointsText, this.bestPointsText,this.play ],
                ease: 'Bounce.easeIn',
                y: 400,
                duration: 1000,
                onComplete: () => {
                    this.scene.start('Play');
                }
            });
        });

        this.play.on(Phaser.Input.Events.POINTER_OVER, () => {
            this.sound.play('menu_clic',{volume: 1,});
        });

        if(this.points > this.betsPoints) {
            localStorage.setItem('best_points', this.points);
        }
    }
}

export default Menu;
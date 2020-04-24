class Bootloader extends Phaser.Scene {
    constructor() {
        super("Bootloader");
    }

    preload() {
        this.load.path = "./assets/";
        
        this.load.image([
            'fondo',
            'plataforma',
            'plataforma_movible',
            'logo',
            'heart',
            'pildora',
            'play'
        ]);

        /** Audio */
        this.load.audio('menu_clic', 'menu_clic.wav');
        this.load.audio('hit', 'hit.mp3');
        this.load.audio('item_drop', 'item_drop.mp3');
        this.load.audio('nou', 'nou.mp3');
        this.load.audio('no_me_toques', 'no_me_toques.mp3');
        this.load.audio('back_s', 'back_s.mp3');
        this.load.audio('game_over', 'game_over.mp3');
        this.load.audio('back_sound', 'back_sound.wav');

        /**virus image */
        this.load.spritesheet('virus', 
        'virus.png',
        { frameWidth: 32, frameHeight: 32 }
            );

        /** amigos image */
        this.load.spritesheet('amigos', 
        'amigos.png',
        { frameWidth: 32, frameHeight: 32 }
            );

        /**persona sprite */
        this.load.atlas('persona', 'persona/persona_clone.png', 'persona/persona_atlas.json');
        this.load.animation('persona_anim', 'persona/persona_anim.json');

        /**Fuente texto */
        this.load.image("font", "font/font.png");
        this.load.json("fontData", "font/font.json");

        /* loading bar */
        this.ProgressAssets();

        this.load.on("complete", () => {
            this.sound.play('back_sound', {loop: true, volume: 0.015,});
            const fontData = this.cache.json.get("fontData");
            this.cache.bitmapFont.add(
                "pixelFont",
                Phaser.GameObjects.RetroFont.Parse(this, fontData)
            );

            this.scene.start("Menu");
        });
    }

    /* loading bar */
    ProgressAssets() {
        var width = this.cameras.main.width;
		var height = this.cameras.main.height;
        var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
        progressBox.fillStyle(0xd7385e, 0.8);
		progressBox.fillRect(width/4.3, 250, 320, 50);
        
        var loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Cargando...',
			style: {
				font: '35px monospace',
				fill: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);
		
		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '33px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);
		
		var assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: '',
			style: {
				font: '23px monospace',
				fill: '#ffffff'
			}
		});
		assetText.setOrigin(0.5, 0.5);
		
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(width/4, 260, 300 * value, 30);
		});
		
		// this.load.on('fileprogress', function (file) {
		// 	assetText.setText('Loading asset: ' + file.key);
		// });
    }
}
export default Bootloader;

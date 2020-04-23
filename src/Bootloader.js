class Bootloader extends Phaser.Scene {
    constructor() {
        super("Bootloader");
    }

    preload() {
        console.log("Bootloader");
        this.load.path = "./assets/";
        // this.load.setPath('./assets/');

        this.load.image([
            "fciudad",
            'fondo',
            'fondo2',
            'plataforma',
            'plataforma2',
            'bomb',
            'life',
            'tomato_item',
            'logo',
            'play',
            'logo_play',
            'heart',
            'heart2',
            'pildora',
            'play2'
        
        ]);

        this.load.spritesheet('virus', 
        'virus.png',
        { frameWidth: 32, frameHeight: 32 }
    );
    this.load.spritesheet('amigos', 
        'amigos.png',
        { frameWidth: 32, frameHeight: 32 }
    );
        this.load.atlas('persona', 'persona/persona_clone.png', 'persona/persona_atlas.json');
        this.load.animation('persona_anim', 'persona/persona_anim.json');

        this.load.image("font", "font/font.png");
        this.load.json("fontData", "font/font.json");

        this.load.on("complete", () => {
            console.log("Load complete");
            const fontData = this.cache.json.get("fontData");
            this.cache.bitmapFont.add(
                "pixelFont",
                Phaser.GameObjects.RetroFont.Parse(this, fontData)
            );

            this.scene.start("Menu");
        });
    }

    // create() {
    //     // this.add.image(this.scale.width / 2, this.scale.height / 2, 'logo_gamma');
    // }
}
export default Bootloader;

import fs from 'fs';
import https from 'https';
import path from 'path';

const images = [
    { name: 'melon.png', url: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?auto=format&fit=crop&q=80&w=400' },
    { name: 'dragonfruit.png', url: 'https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&q=80&w=400' },
    { name: 'guava.png', url: 'https://images.unsplash.com/photo-1601646270634-1cde677d2fc1?auto=format&fit=crop&q=80&w=400' },
    { name: 'kiwi.png', url: 'https://images.unsplash.com/photo-1585059895524-72359aa06010?auto=format&fit=crop&q=80&w=400' },
    { name: 'pear.png', url: 'https://images.unsplash.com/photo-1615484477201-dc95bf3122c8?auto=format&fit=crop&q=80&w=400' },
    { name: 'pomegranate.png', url: 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=400' },
    { name: 'soursop.png', url: 'https://images.unsplash.com/photo-1596472251147-926c4f74d08b?auto=format&fit=crop&q=80&w=400' },
    { name: 'kale.png', url: 'https://images.unsplash.com/photo-1524179091875-9c6a1e3890f5?auto=format&fit=crop&q=80&w=400' },
    { name: 'starfruit.png', url: 'https://images.unsplash.com/photo-1601002241619-64cce16751c1?auto=format&fit=crop&q=80&w=400' }
];

const dir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

console.log('Downloading images...');

let completed = 0;
images.forEach(img => {
    const dest = path.join(dir, img.name);
    const file = fs.createWriteStream(dest);
    
    const requestOptions = {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    };

    const download = (url) => {
        https.get(url, requestOptions, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                download(response.headers.location);
            } else if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded ${img.name}`);
                    completed++;
                    if (completed === images.length) {
                        console.log('All images downloaded successfully.');
                    }
                });
            } else {
                console.error(`Failed to download ${img.name}. Status code: ${response.statusCode}`);
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            console.error(`Error downloading ${img.name}: ${err.message}`);
        });
    };
    
    download(img.url);
});

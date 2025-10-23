    // Class colors and icons
    const classColors = {
        "Death Knight": "#C41E3A",
        "Demon Hunter": "#A330C9",
        "Druid": "#FF7D0A",
        "Evoker": "#33937F",
        "Hunter": "#AAD372",
        "Mage": "#69CCF0",
        "Monk": "#00FF96",
        "Paladin": "#F58CBA",
        "Priest": "#FFFFFF",
        "Rogue": "#FFF569",
        "Shaman": "#0070DE",
        "Warlock": "#9482C9",
        "Warrior": "#C79C6E"
    };

    const classIcons = {
        "Death Knight": "/scruffed/static/img/icons/deathknight.png",
        "Demon Hunter": "/scruffed/static/img/icons/demonhunter.png",
        "Druid": "/scruffed/static/img/icons/druid.png",
        "Evoker": "/scruffed/static/img/icons/evoker.png",
        "Hunter": "/scruffed/static/img/icons/hunter.png",
        "Mage": "/scruffed/static/img/icons/mage.png",
        "Monk": "/scruffed/static/img/icons/monk.png",
        "Paladin": "/scruffed/static/img/icons/paladin.png",
        "Priest": "/scruffed/static/img/icons/priest.png",
        "Rogue": "/scruffed/static/img/icons/rogue.png",
        "Shaman": "/scruffed/static/img/icons/shaman.png",
        "Warlock": "/scruffed/static/img/icons/warlock.png",
        "Warrior": "/scruffed/static/img/icons/warrior.png"
    };

    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');
    const prevBtn = document.querySelector('.lightbox .prev');
    const nextBtn = document.querySelector('.lightbox .next');

let currentIndex = 0;

function showLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.style.display = 'flex';
}

galleryImages.forEach((img, i) => {
    img.addEventListener('click', () => showLightbox(i));
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
});

// Define rank order (adjust numbers to match GM → 1 → 2 → 3)
const showRanks = [0, 1, 2, 3, 4, 5]; // Example: 0 = GM, 1 = Rank 1, etc.

fetch('https://raider.io/api/v1/guilds/profile?region=us&realm=moon-guard&name=Scuffed&fields=members')
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById('roster-grid');

        // Filter only the ranks we want
        const filtered = data.members.filter(member => showRanks.includes(member.rank));

        // Sort ascending by rank (GM first)
        const sorted = filtered.sort((a,b) => a.rank - b.rank);

        sorted.forEach(member => {
            const char = member.character;
            const color = classColors[char.class] || '#fff';
            const icon = classIcons[char.class] || '';

            // Create card wrapped in a link
            const link = document.createElement('a');
            link.href = char.profile_url;
            link.target = '_blank';
            link.className = 'roster-link';

            const card = document.createElement('div');
            card.className = 'roster-card';

            const classImg = document.createElement('img');
            classImg.src = icon;
            classImg.alt = char.class;
            classImg.className = 'class-icon';
            classImg.style.borderColor = color;

            const nameDiv = document.createElement('div');
            nameDiv.className = 'member-name';
            nameDiv.style.color = color;
            nameDiv.textContent = char.name;

            const specDiv = document.createElement('div');
            specDiv.className = 'member-spec';
            specDiv.textContent = char.active_spec_name || '-';

            card.appendChild(classImg);
            card.appendChild(nameDiv);
            card.appendChild(specDiv);

            link.appendChild(card);
            grid.appendChild(link);
        });
    })
    .catch(err => console.error(err));
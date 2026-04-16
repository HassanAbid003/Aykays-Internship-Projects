const testimonials = [
  {
    img: "https://i.pravatar.cc/100?img=12",
    text: "Experience the perfect blend of technology and fashion with our smartwatches. Best decision ever!",
    name: "John",
    role: "Manager"
  },
  {
    img: "https://i.pravatar.cc/100?img=32",
    text: "The battery life is insane and the design is premium. I get compliments daily. Highly recommended!",
    name: "Olivia",
    role: "Designer"
  },
  {
    img: "https://i.pravatar.cc/100?img=15",
    text: "Smart, stylish, and seamless integration. This smartwatch elevated my daily productivity and style.",
    name: "Michael",
    role: "Developer"
  },
  {
    img: "https://i.pravatar.cc/100?img=45",
    text: "Outstanding craftsmanship and intuitive UI. The fitness tracking features are game-changing!",
    name: "Sophia",
    role: "Creator"
  },
  {
    img: "https://i.pravatar.cc/100?img=28",
    text: "From notifications to health metrics, it's my daily companion. Worth every penny!",
    name: "David Kim",
    role: "Product Designer",
   }
];

let index = 0;

function updateCards() {
  for (let i = 0; i < 3; i++) {
    const data = testimonials[(index + i) % testimonials.length];

    document.getElementById(`card${i+1}Img`).src = data.img;
    document.getElementById(`card${i+1}Text`).textContent = data.text;
    document.getElementById(`card${i+1}Name`).textContent = data.name;
    document.getElementById(`card${i+1}Role`).textContent = data.role;
  }

  index = (index + 3) % testimonials.length;
}

updateCards();

setInterval(updateCards, 6000);


const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function showNext() {
  index = (index + 3) % testimonials.length;
  updateCards();
}

function showPrev() {
  index = index - 3;

  if (index < 0) {
    index = testimonials.length - (testimonials.length % 3 || 3);
  }

  updateCards();
}

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);
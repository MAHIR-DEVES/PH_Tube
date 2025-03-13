//
const showLoder = () => {
  document.getElementById('loder').classList.remove('hidden');
  document.getElementById('video-container').classList.add('hidden');
};
const hideLoder = () => {
  document.getElementById('loder').classList.add('hidden');
  document.getElementById('video-container').classList.remove('hidden');
};
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName('active');
  for (let btn of activeButtons) {
    btn.classList.remove('active');
  }
}

function lodeCatagory() {
  // fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    // 2- convart promise to json
    .then(res =>
      res
        .json()
        // 3- send data to display
        .then(data => displayCatagaro(data.categories))
    );
}
function displayCatagaro(categories) {
  //  get the container
  const catagoryContainer = document.getElementById('catagory-container');

  // loop operation on array of object
  for (let cat of categories) {
    // console.log(cat);

    // create element
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="lodeCategoryVideo(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    // append the element
    catagoryContainer.append(categoryDiv);
  }
}
lodeCatagory();

// lode video
function lodeVedios(searchText = '') {
  showLoder();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then(res => res.json())
    .then(data => {
      document.getElementById('btn-all').classList.add('active');
      displayVideos(data.videos);
    });
}

const displayVideos = videos => {
  const videoContainer = document.getElementById('video-container');
  videoContainer.innerHTML = '';
  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full text-center flex flex-col justify-center items-center py-45">
      <img class="h-30 w-30" src="./asset/Icon.png" alt="">
      <h2 class="text-2xl font-bold">Oops!! sorry, there is no content Here</h2>
    </div>
    `;
    hideLoder();
    return;
  }
  videos.forEach(video => {
    const videoCart = document.createElement('div');
    videoCart.innerHTML = `
     <div class="card bg-base-100 shadow-sm">
      <figure class="relative">
        <img class='w-full h-[250px] object-cover' src="${
          video.thumbnail
        }" alt="Shoes" />
        <span class="absolute bottom-2 right-2 bg-black text-white  px-3 rounded-xl">3hrs 56 min ago</span>
      </figure>
      <div class=" flex gap-2 px-0 py-6">
        <div class="profile">
          <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-7 rounded-full ring ring-offset-2">
              <img src="${video.authors[0].profile_picture}" />

            </div>
          </div>
        </div>
        <div class="intro">
          <h2>${video.title}</h2>
          <p class="text-gray-400 flex gap-2 items-center">
          ${video.authors[0].profile_name}
          ${
            video.authors[0].verified == true
              ? `<img class=" w-5 h-5"
              src="./asset/icons8-verified-badge-48.png" alt="">`
              : ``
          }
          </p>
          <p class="text-gray-400">${video.others.views} views</p>
        </div>
      </div>
    </div>
    <button onclick="lodeVideoDetails('${
      video.video_id
    }')" class="btn btn-block my-5"> Show Details</button>
    </div>
    
    `;
    // apeend
    videoContainer.append(videoCart);
  });
  hideLoder();
};

// lode category video
const lodeCategoryVideo = id => {
  showLoder();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      const clickedBtn = document.getElementById(`btn-${id}`);
      clickedBtn.classList.add('active');

      displayVideos(data.category);
    });
};

// lode lodeVideoDetails
const lodeVideoDetails = videoID => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
  fetch(url)
    .then(res => res.json())
    .then(data => dispalyVideoDetalis(data.video));
};

const dispalyVideoDetalis = video => {
  document.getElementById('video_details').showModal();
  const detialsContainer = document.getElementById('detiels-container');
  detialsContainer.innerHTML = `
  
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="avatar">
  <div class="ring-primary ring-offset-base-100 w-14  rounded-full ring ring-offset-2">
    <img  src="${video.authors[0].profile_picture}" />
  </div>
</div>
    <p>${video.authors[0].profile_name}</p>
    
  </div>
</div>
  `;
};

document.getElementById('search-inout').addEventListener('keyup', e => {
  const input = e.target.value;
  lodeVedios(input);
});

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
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    // append the element
    catagoryContainer.append(categoryDiv);
  }
}
lodeCatagory();

// lode video
function lodeVedios() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos));
}

lodeVedios();
// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

const displayVideos = videos => {
  const videoContainer = document.getElementById('video-container');

  videos.forEach(video => {
    const videoCart = document.createElement('div');
    videoCart.innerHTML = `
     <div class="card bg-base-100 shadow-sm">
      <figure class="relative">
        <img class='w-full h-[250px] object-cover' src="${video.thumbnail}" alt="Shoes" />
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
          <p class="text-gray-400 flex gap-2 items-center">${video.authors[0].profile_name}<img class=" w-5 h-5"
              src="./asset/icons8-verified-badge-48.png" alt="">
          </p>
          <p class="text-gray-400">${video.others.views} views</p>
        </div>
      </div>
    </div>
    </div>
    
    `;
    // apeend
    videoContainer.append(videoCart);
  });
};

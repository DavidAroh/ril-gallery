const albums = [
  {id:'miws',name:'MIWS',folder:'1o9UQJQVZDdFXPuB-qfXEtC3EKOyynZi3',photos:['miws-1','miws-2','miws-3'],alts:['Participants working with laptops around a shared table','A conversation during a MIWS session','A MIWS participant sharing ideas with a microphone']},
  {id:'summer',name:'Kids Summer Camp',folder:'1qm_vAbsS_6lhgKIONit_GbDWDREWw8m4',photos:['summer-1','summer-2','summer-3','summer-4'],alts:['A mentor helping children build at a table','Children learning together with laptops','A young camper smiling with a Young Innovator sign','Summer campers holding their creativity and innovation signs']},
  {id:'kcc',name:'KCC',folder:'1R9nJTsspRYXkg7VW7740o4raDFQCWq6x',photos:['kcc-1','kcc-2','kcc-3'],alts:['Schoolchildren taking part in a KCC classroom session','Children listening to a mentor in the classroom','Students smiling while working together on a laptop']},
  {id:'hack',name:'Hack and Chill',folder:'1Xwv52_L9AXLgSarmQnr5S55iu5ZAx4r5',photos:['hack-1','hack-2','hack-3'],alts:['A Hack and Chill participant speaking to the group','A community member smiling and holding a microphone','Participants exchanging ideas during Hack and Chill']}
];
const host = document.querySelector('#albums');
albums.forEach((album, i) => {
  const section = document.createElement('section');
  section.className = `album ${album.id}`; section.id = album.id; section.setAttribute('aria-labelledby',`${album.id}-title`);
  section.innerHTML = `<div class="album-heading"><div class="album-title"><span class="index">0${i+1}</span><h3 id="${album.id}-title">${album.name}</h3></div><div class="album-meta"><span>${album.photos.length} photographs</span><a href="https://drive.google.com/drive/folders/${album.folder}" target="_blank" rel="noopener">Open original album</a></div></div><div class="photo-grid"></div>`;
  const grid = section.querySelector('.photo-grid');
  if (!album.photos.length) grid.innerHTML='<p>Photos will appear here when the album is available.</p>';
  album.photos.forEach((photo,index)=>{
    const button=document.createElement('button'); button.className='photo'; button.setAttribute('aria-label',`View ${album.name} photograph ${index+1}`);
    button.innerHTML=`<img src="assets/${photo}.webp" alt="${album.alts[index]}" loading="lazy" width="1200" height="900"><span class="zoom" aria-hidden="true">+</span>`;
    button.querySelector('img').addEventListener('error',()=>{button.innerHTML='<span class="photo-error">Photo unavailable. Open the original album above.</span>';button.disabled=true;});
    button.addEventListener('click',()=>openPhoto(album,index)); grid.append(button);
  });
  host.append(section);
});
const dialog=document.querySelector('#viewer');
const fullPhoto=document.querySelector('#full-photo');
let currentAlbum, currentIndex=0;
function showPhoto(){
  document.querySelector('#photo-error').hidden=true;fullPhoto.hidden=false;
  fullPhoto.src=`assets/${currentAlbum.photos[currentIndex]}.webp`;fullPhoto.alt=currentAlbum.alts[currentIndex];
  document.querySelector('#viewer-album').textContent=currentAlbum.name;
  document.querySelector('#viewer-count').textContent=`${currentIndex+1} / ${currentAlbum.photos.length}`;
}
function openPhoto(album,index){currentAlbum=album;currentIndex=index;showPhoto();dialog.showModal();}
function movePhoto(step){currentIndex=(currentIndex+step+currentAlbum.photos.length)%currentAlbum.photos.length;showPhoto();}
document.querySelector('#close').addEventListener('click',()=>dialog.close());
document.querySelector('#previous').addEventListener('click',()=>movePhoto(-1));
document.querySelector('#next').addEventListener('click',()=>movePhoto(1));
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')movePhoto(-1);if(event.key==='ArrowRight')movePhoto(1);});
fullPhoto.addEventListener('error',()=>{fullPhoto.hidden=true;document.querySelector('#photo-error').hidden=false;});

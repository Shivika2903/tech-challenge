function func_users(){
	let select = document.getElementById("myUser");

	fetch('https://jsonplaceholder.typicode.com/users').then(function(response)
	{
		response.json().then(function(data)  {
			
			let options = document.createElement('option');
			options.textContent = "-- Select a User --";
			options.value = "select_none";
			select.appendChild(options);
	
			for(let i= 0;i<data.length;i++)
			{			
				options = document.createElement('option');
				options.textContent= data[i].name;
				options.value = data[i].id;
				select.appendChild(options);
			}
		});	
	});
}

function func_userAlbum(){
	
	let user = document.getElementById("myUser").value;
	
	if(user == "select_none")
	{		
		
		document.getElementById("myAlbumP").hidden = true;
		document.getElementById("selectedAlbum").hidden = true;
	}
	else
	{

		
		document.getElementById('userAlbum').innerText = null;		
		let select = document.getElementById("userAlbum");
		

		fetch('https://jsonplaceholder.typicode.com/albums').then(function(response)
		{
			response.json().then(function(data)  {
				
				var options = document.createElement('option');
				options.textContent = "-- Select an Album --";
				options.value = 'select_none';
				select.appendChild(options);
		
				for(var i= 0;i<data.length;i++)
				{
					if(data[i].userId == user){
						
						document.getElementById("myAlbumP").hidden = false;
						
						options = document.createElement('option');
						options.textContent= data[i].title;
						options.value = data[i].id;
						select.appendChild(options);
					}
					
				}
			});	
		});
	}

}

function func_displayPicture(){
	let album = document.getElementById("userAlbum").value;
	
	if(album == "select_none"){
		document.getElementById("selectedAlbum").hidden = true;
	}
	else
	{
		document.getElementById('pictures').innerText = null;
		
		fetch('https://jsonplaceholder.typicode.com/photos').then(function(response)
		{
			response.json().then(function(data)  
			{
				for(var i= 0;i<data.length;i++)
				{
					if(data[i].albumId == album)
					{
						var title = data[i].title;
						var url = data[i].url;
						var thumbnailUrl = data[i].thumbnailUrl;
						
						var mydiv = document.getElementById('pictures')
						var div_html = document.createElement('a');
						div_html.setAttribute('href',url);
						div_html.setAttribute('target',"_blank");
						div_html.innerHTML = "<img src='" + thumbnailUrl + "'>";

						mydiv.appendChild(div_html);
						
						document.getElementById("selectedAlbum").hidden = false;
					}
					
				}
			});	
		});
	}
}
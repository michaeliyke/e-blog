import {useRef, useState} from 'react';

export function CreateAPost(){
	const hiddenFileInput = useRef(null);
	const [imagePreview, setImagePreview] = useState(null);

	// Trigger hidden file input on button click
	function triggerFileInput(){
		hiddenFileInput.current.click();
	}

	// Handle the file input change
	function handleFileChange(event){
		let file =  null;
		if(!(event.target.files && event.target.files[0]))
			return;
		file = event.target.files[0];
		const reader = new FileReader();
		reader.onloadend = function readImageFile(){
			setImagePreview(reader.result);
		};
		reader.readAsDataURL(file);
	}

	// Remove the image preview
	function handleRemoveImage(){
		setImagePreview(null);
	}



	return (
		<div className="bg-white p-4 pt-10">
			{/* Preview image when selected */}
			{imagePreview && (
			<div className="flex justify-start mb-0 gap-6">
					<img
						src={imagePreview}
						alt="Preview of selected image"
						className="w-150 h-auto object-cover mb-1 rounded"
						style={{ width: '150px', height: 'auto', objectFit: 'cover' }}
					/>

			{/* Buttons to change or remove image */}
			 <div className="flex flex-row items-center space-x-4">
    			<button
					className="bg-white text-black border-gray-500 border py-2 px-4 mb-2 rounded"
					onClick={triggerFileInput}
					style={{ boxShadow: '0 0 5px gray'}}
					title='Use a ration for of 1000x420 for best result.'
				>
              Change
            </button>
            <button
              className="text-red-500 py-2 px-4 mb-2 border border-white hover:bg-gray-50 rounded"
              onClick={handleRemoveImage}
            >
              Remove
            </button>
          </div>
		  </div>
		  )}
			{Boolean(imagePreview) || (
				<button className="bg-white text-black border-gray-500 border py-2 px-4 mb-4 rounded"
			title="Use a ration for of 1000x420 for best result."
			onClick={triggerFileInput}
			aria-label='Add a Cover Image'
			>
				Add a Cover Image
			</button>
			)}

			{/* Hidden input for file selection */}
			<input
				type="file"
				ref={hiddenFileInput}
				className="hidden"
				accept="image/*"
				aria-hidden="true"
				onChange={handleFileChange}
			/>

			{/* Textarea for post title and tags */}
			<textarea
				className="w-full focus:outline-none p-6 pb-0 mb-4 border-none rounded appearance-none resize-none text-5xl"
				placeholder="Post Title"
			></textarea>

			{/* Input for tags */}
			<input
				className="w-full text-sm focus:outline-none p-2 pl-6 border-none rounded appearance-none resize-none"
				placeholder="Add up to 4 tags"
			></input>

			{/* Dividing div panel which will house formatting buttons */}
			<div className="flex justify-center gap-4 p-4 my-4 bg-gray-100">
				formatting comming soon..
			</div>


			{/* Textarea for post content */}
			<textarea
				className="w-full focus:outline-none p-6 pt-0 mt-4 border-none rounded appearance-none resize-none text-[22px]"
				placeholder="Post Content"
			></textarea>
		</div>
	);
};

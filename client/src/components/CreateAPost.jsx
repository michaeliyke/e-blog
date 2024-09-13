import {useRef, useState} from 'react';

export function CreateAPost(){
	const hiddenFileInput = useRef(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [tags, setTags] = useState([]);
  	const [input, setInput] = useState('');
	const [content, setContent] = useState('');
	const [title, setTitle] = useState('');

	// Add a tag when the user types a space or a comma
  function handleInputChange(eventObj) {
    const value = eventObj.target.value;
    if (value.includes(' ') || value.includes(',')) {
      const newTag = value.trim().replace(',', '');
      if (newTag && tags.length < 4 && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInput(''); // Clear the input after adding the tag
    } else {
      setInput(value); // Continue typing
    }
  }

  // Remove a tag when clicking on it
  function removeTag(tagToRemove) {
	const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
  };

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

	// Handle form submission
	 function handleSubmit(eventObj) {
		eventObj.preventDefault();
		const postData = {
		title,
		content,
		tags,
		image: imagePreview,
		};
		console.log('Post submitted:', postData);

		// Submit form

	// Clear form details
    setTitle('');
    setTags([]);
    setInput('');
    setContent('');
    setImagePreview(null);
  }

  function handleKeyDown(eventOb) {
    if (eventOb.key === ' ' || eventOb.key === ',') {
      eventOb.preventDefault();
      if (input.trim() && tags.length < 4) {
        setTags([...tags, input.trim()]);
        setInput('');
      }
    }
  }


	return (
		<form onSubmit={handleSubmit}>
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
				placeholder="New post title here..."
				onChange={(eventObj) => setTitle(eventObj.target.value)}
				value={title}
			></textarea>

			{/* Input for tags */}
	<div className="w-full p-2 pl-6 border-none rounded appearance-none">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 px-2 py-1 rounded-full flex items-center">
            {tag}
            <button
              className="ml-2 hover:text-red-500 font-bold-100 rounded-[15px]"
              onClick={() => removeTag(tag)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      {tags.length < 4 ? (
        <input
          className="w-full text-sm focus:outline-none p-2 border rounded appearance-none"
          placeholder="Add up to 4 tags"
          value={input}
          onChange={handleInputChange}
		  onKeyDown={handleKeyDown}
        />
      ) : (
        <p className="text-sm text-gray-500">You can add up to 4 tags only.</p>
      )}
    </div>

	{/* Dividing div panel which will house formatting buttons */}
	<div className="flex justify-center gap-4 p-4 my-4 bg-gray-100">
		formatting comming soon..
	</div>


	{/* Textarea for post content */}
	<textarea
		className="w-full focus:outline-none p-6 pt-0 mt-4 border-none rounded appearance-none resize-none text-[22px]"
		placeholder="Post Content"
		onChange={(eventObj) => setContent(eventObj.target.value)}
		value={content}
	></textarea>

</div>

{/* Submit button */}
  <div className="flex justify-start mt-6">
    <button
      className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-3 rounded"
      type="submit"
    >
      Publish
    </button>
</div>

</form>
	);
};

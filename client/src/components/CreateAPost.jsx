import {useRef} from 'react';

export function CreateAPost(){
	const hiddenFileInput = useRef(null);

	// Function to trigger hidden file input on button click
	function triggerFileInput(){
		hiddenFileInput.current.click();
	}

	return (
		<div className="bg-white p-4">
			<textarea
				className="w-full p-2 mb-4 border-none rounded appearance-none resize-none"
				placeholder="Post Title"
			></textarea>
			<button className="bg-white text-black border-gray-500 border py-2 px-4 mb-4 rounded"
			title="Use a ration for of 1000x420 for best result."
			onClick={triggerFileInput}
			aria-label='Add a Cover Image'
			>
				Add a Cover Image
			</button>
			{/* Hidden input for file selection */}
			<input
				type="file"
				ref={hiddenFileInput}
				className="hidden"
				accept="image/*"
				aria-hidden="true"
			/>
			<textarea
				className="w-full p-2 border-none rounded appearance-none resize-none"
				placeholder="Add up to 4 tags"
			></textarea>
		</div>
	);
};

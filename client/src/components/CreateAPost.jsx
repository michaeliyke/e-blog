import { useRef, useState } from "react";

export function CreateAPost() {
  const hiddenFileInput = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // Add a tag when the user types a space or a comma
  function handleInputChange(eventObj) {
    const value = eventObj.target.value;
    if (value.includes(" ") || value.includes(",")) {
      const newTag = value.trim().replace(",", "");
      if (newTag && tags.length < 4 && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInput(""); // Clear the input after adding the tag
    } else {
      setInput(value); // Continue typing
    }
  }

  // Remove a tag when clicking on it
  function removeTag(tagId) {
    const newTags = tags.filter((tag) => tag.id !== tagId);
    setTags(newTags);
  }

  // Trigger hidden file input on button click
  function triggerFileInput(e) {
    e.preventDefault();
    hiddenFileInput.current.click();
  }

  // Handle the file input change
  function handleFileChange(event) {
    event.preventDefault();
    let file = null;
    if (!(event.target.files && event.target.files[0])) return;
    file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function readImageFile() {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  // Remove the image preview
  function handleRemoveImage() {
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
    console.log("Post submitted:", postData);

    // Submit form

    // Clear form details
    setTitle("");
    setTags([]);
    setInput("");
    setContent("");
    setImagePreview(null);
  }

  function handleKeyDown(eventOb) {
    if (eventOb.key === " " || eventOb.key === "," || eventOb.key === "Enter") {
      eventOb.preventDefault();
      if (input.trim() && tags.length < 4) {
        setTags([...tags, { id: tags.length, name: input.trim() }]);
        setInput("");
      }
    }
  }

  return (
    <div className="bg-white p-10 pt-10 w-full flex flex-col items-center">
      {/* Preview image when selected */}
      <div className="max-w-[900px] w-[90%]">
        {imagePreview && (
          <div className="flex justify-start mb-0 gap-6">
            <img
              src={imagePreview}
              alt="Preview of selected image"
              className="w-150 h-auto object-cover mb-1 rounded"
              style={{ width: "150px", height: "auto", objectFit: "cover" }}
            />

            {/* Buttons to change or remove image */}
            <div className="flex flex-row items-center space-x-4">
              <button
                className="bg-white text-black border-gray-500 border py-2 px-4 mb-2 rounded"
                onClick={triggerFileInput}
                style={{ boxShadow: "0 0 5px gray" }}
                title="Use a ration for of 1000x420 for best result."
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
          <button
            className="bg-white text-black border-gray-500 border py-2 px-4 mb-4 rounded"
            title="Use a ration for of 1000x420 for best result."
            onClick={triggerFileInput}
            aria-label="Add a Cover Image"
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
        <div className="border-2 shadow-md border-gray-300 rounded-md p-4">
          <textarea
            className="scrool__style mt-1 columns-3xl overflow-y-scroll text-ellipsis  w-full h-20 focus:outline-none appearance-none resize-none text-xl"
            placeholder="New post title here..."
            onChange={(eventObj) => setTitle(eventObj.target.value)}
            value={title}
            rows={1}
            maxLength={100}
          ></textarea>

          <hr className="my-2 border-t-[3px] border-gray-200" />

          {/* Input for tags */}
          <div
            className="w-full  rounded appearance-none
		flex items-center h-auto min-h-7"
          >
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="
				bg-gray-200  pl-2 rounded-full flex items-center
				 text-[14px] font-poppins "
                >
                  {tag.name}
                  <button
                    className="text-lg  font-bold size-7 hover:text-red-500  rounded-full hover:bg-gray-300"
                    onClick={() => removeTag(tag.id)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            {tags.length < 4 ? (
              <input
                className="ml-3 flex-1 w-auto text-sm focus:outline-none  rounded appearance-none "
                placeholder="Add up to 4 tags"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <span className="">
                <p className="ml-3 text-sm text-gray-500">
                  You can add up to 4 tags only.
                </p>
              </span>
            )}
          </div>
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
    </div>
  );
}

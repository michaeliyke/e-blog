import { useRef, useState } from "react";

export function CreateAPost() {
  const hiddenFileInput = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const textAreaRef = useRef(null);

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
    // setTitle("");
    // setTags([]);
    // setInput("");
    // setContent("");
    // setImagePreview(null);
  }

  // handle the separation of tags
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
    <div className="w-full flex flex-col items-center h-full">
      {/* Preview image when selected */}
      <div className="mt-10 flex-1 max-w-[900px] w-[90%] overflow-y-scroll scrool__style px-5">
        {imagePreview && (
          <div className="flex justify-start mb-0 gap-6 max-h-[150px]">
            <img
              src={imagePreview}
              alt="Preview of selected image"
              className="w-150 h-auto object-cover mb-1 rounded"
              style={{ width: "auto", height: "auto", objectFit: "contain" }}
            />
          </div>
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
            className="scrool__style mt-1  text-ellipsis  w-full h-20 focus:outline-none appearance-none resize-none text-2xl font-poppins font-medium"
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
        <div className=" h-[50%] mt-6  rounded-md p-4">
          <hr className="mb-5 border-t-[3px] border-gray-200" />
          <textarea
            ref={textAreaRef}
            className="scrool__style h-full w-full focus:outline-none border-none rounded appearance-none resize-none "
            placeholder="Start Writing ..."
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </div>
      </div>
      {/* footer */}
      <div className="max-w-[900px] w-[90%] h-15 border-t-2 border-gray-400  bottom-0 py-5 px-5 flex bg-white z-10">
        <button
          onClick={handleSubmit}
          className=" bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-3 rounded mr-2"
        >
          Publish
        </button>
        {!imagePreview ? (
          <button
            title="cover preview"
            onClick={triggerFileInput}
            aria-label="Add a Cover Image"
            className=" bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-3 rounded mr-2"
          >
            Upload a cover image
          </button>
        ) : (
          <div>
            <button
              onClick={triggerFileInput}
              style={{ boxShadow: "0 0 5px gray" }}
              title="cover preview"
              className=" bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-3 rounded mr-2"
            >
              Change
            </button>
            <button
              onClick={handleRemoveImage}
              className=" bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-3 rounded mr-2"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

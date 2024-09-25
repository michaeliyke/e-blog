import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { unify } from "../util/Tools";
import { useNavigate } from "react-router-dom";

export function CreateAPost() {
  const hiddenFileInput = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const [suggestionsStyle, setSuggestionsStyle] = useState({ display: "none" });
  const textAreaRef = useRef(null);
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // we use useMemo
  const suggest = useMemo(
    () =>
      debounce(async (name) => {
        try {
          const suggestionUrl = new URL("http://127.0.0.1:3000/tags/suggest");
          suggestionUrl.searchParams.set("tag", name);
          const { data } = await axios.get(suggestionUrl);
          setTagSuggestions(
            data.filter(
              (newTag) => !tags.map((tag) => tag.name).includes(newTag.name)
            )
          );
        } catch (err) {
          console.log({ err });
        }
      }, 200), // 200 ms delay
    [tags]
  );

  useEffect(() => {
    if (tagSuggestions.length > 0 && displaySuggestions) {
      setSuggestionsStyle({ display: "block" });
    } else if (displaySuggestions) {
      setSuggestionsStyle({ display: "none" });
    }
  }, [displaySuggestions, tagSuggestions]);

  // Add a tag when the user types a space or a comma
  function handleInputChange(eventObj) {
    const value = eventObj.target.value;

    setInput(value); // Continue typing
    if (value) suggest(value);
    else setTagSuggestions([]);
  }

  // Remove a tag when clicking on it
  function removeTag(tagId) {
    const newTags = tags.filter((tag) => tag.id !== tagId);
    setTags(newTags);
  }

  // Trigger hidden file input on button click
  function triggerFileInput(e) {
    e.preventDefault();
    if (isLoading) return;
    hiddenFileInput.current.click();
  }

  // Handle the file input change
  function handleFileChange(event) {
    event.preventDefault();
    if (!(event.target.files && event.target.files[0])) return;
    let file = null;
    file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function readImageFile() {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setCoverPicture(file);
  }

  // Remove the image preview
  function handleRemoveImage() {
    if (isLoading) return;
    setImagePreview(null);
  }

  const handleSuggestion = (e, suggestion = null) => {
    let value;
    if (suggestion) {
      value = suggestion.name.trim();
    } else {
      value = e.currentTarget.getAttribute("data-value").trim();
    }
    setTags([...tags, { id: tags.length, name: value }]);
    setInput("");
    setTagSuggestions([]);
    if (tags.length === 4) textAreaRef.current.focus();
    else inputRef.current.focus();
  };

  // Handle form submission
  function handleSubmit(eventObj) {
    eventObj.preventDefault();
    if (isLoading) return;
    if (!title) {
      alert("Please enter a title");
      return;
    } else if (!content) {
      alert("Please write a post");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", content);
    formData.append("tags", JSON.stringify(tags.map((tag) => tag.name)));
    if (coverPicture) {
      console.dir(coverPicture);
      formData.append("image", coverPicture);
    }
    setIsLoading(true);
    axios
      .post("http://127.0.0.1:3000/blogs/new", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progress) => {
          const total = progress.total;
          if (total) {
            const progre = Math.round((progress.loaded * 100) / total);
            setProgress(progre);
          }
        },
      })
      .then((res) => {
        navigate(`/posts/${res.data.post.slug}`);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        alert("make sure you fill all fields");
      });
  }

  // handle the separation of tags
  //
  function handleKeyDown(eventOb) {
    const value = input.trim();
    if (eventOb.key === " " || eventOb.key === "," || eventOb.key === "Enter") {
      eventOb.preventDefault();
      if (value && tags.length < 4) {
        setTags([...tags, { id: tags.length, name: unify(value) }]);
        setInput("");
      }
    } else if (eventOb.key === "Tab") {
      eventOb.preventDefault();
      if (tagSuggestions[0]) handleSuggestion(eventOb, tagSuggestions[0]);
      else if (value) handleSuggestion(eventOb, { name: unify(value) });
    } else if (eventOb.key === "Backspace") {
      if (!value && tags.length !== 0) {
        eventOb.preventDefault();
        setInput(tags[tags.length - 1].name);
        setTags(tags.slice(0, -1));
      }
    }
  }

  return (
    <div className="w-full flex flex-col items-center h-full">
      <div
        className={`w-80 h-30 fixed flex flex-col justify-center items-center top-4 bg-gray-300 rounded-lg shadow-xl p-4 border border-gray-400
           transition-transform duration-500 ease-in-out ${
             isLoading && coverPicture
               ? "translate-y-20 opacity-100"
               : "-translate-y-full opacity-0"
           }`}
      >
        <div className="flex flex-col justify-between items-center mb-2">
          <span className="text-lg font-semibold text-blue-600 dark:text-white">
            File Upload
          </span>
        </div>

        <div className="w-[85%] bg-gray-200 rounded-full h-5 relative overflow-hidden">
          {/* Gradient progress bar */}
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-700 h-5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
          {/* Centered progress percentage */}
          <span className="absolute inset-0 flex justify-center items-center text-[16px] font-medium text-white">
            {progress !== 100 ? `${progress}%` : "DONE"}
          </span>
        </div>
      </div>

      {/* Preview image when selected */}
      <div className="mt-10 flex-1 max-w-[900px] w-[90%] overflow-y-scroll scroll__style px-5">
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
            className="scroll__style mt-1  text-ellipsis  w-full h-20 focus:outline-none appearance-none resize-none text-2xl font-poppins font-medium"
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
              <div>
                <input
                  className="ml-3 flex-1 w-auto text-sm focus:outline-none  rounded appearance-none"
                  placeholder="Add up to 4 tags"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  maxLength={20}
                  onFocus={() => setDisplaySuggestions(true)}
                  onBlur={() => setDisplaySuggestions(false)}
                  ref={inputRef}
                />
                <div
                  style={suggestionsStyle}
                  className="scroll__style absolute border border-black h-auto max-h-40 w-44 bg-slate-100 rounded-md shadow-lg font-poppins
                text-[15px] overflow-y-scroll py-1"
                >
                  <ul>
                    {tagSuggestions.map((tag) => (
                      <li
                        className="py-1 px-2 hover:bg-slate-300"
                        onClick={handleSuggestion}
                        key={tag._id}
                        data-value={tag.name}
                      >
                        #{tag.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
            className="scroll__style h-full w-full focus:outline-none border-none rounded appearance-none resize-none mb-2"
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
          className=" bg-blue-700 hover:bg-blue-900 text-white font-bold w-[130px] rounded mr-2
          flex space-x-2 justify-center items-center"
        >
          {isLoading ? (
            <>
              <svg
                className="inline size-6 me-1 text-white animate-spin"
                aria-hidden="true"
                role="status"
                viewBox="-2.4 -2.4 20.80 20.80"
                xmlns="http://www.w3.org/2000/svg"
                fill=""
                stroke="#fff"
                strokeWidth="0.544"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g fill="#fff" fillRule="evenodd" clipRule="evenodd">
                    <path
                      d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                      fill="#fff"
                      opacity=".2"
                    ></path>
                    <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              Posting ...
            </>
          ) : (
            "Publish"
          )}
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

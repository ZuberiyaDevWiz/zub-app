"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function MyLove() {
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [typewriterText, setTypewriterText] = useState("");
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [allMessagesTyped, setAllMessagesTyped] = useState(false);
  const [showCanUText, setShowCanUText] = useState(false);
  const [showFinalButton, setShowFinalButton] = useState(false);
  const [canUText, setCanUText] = useState("Can you handle more excitement...?");
  const [showNewText, setShowNewText] = useState(false);
  const [showNewButton, setShowNewButton] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);
  const [showNewFinalText, setShowNewFinalText] = useState(false);
  const [showFinalButtonAfterSorry, setShowFinalButtonAfterSorry] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [countdown, setCountdown] = useState(3); // 3-second countdown for the button
  const [isCountdownActive, setIsCountdownActive] = useState(false); // Flag to control countdown state
  const [showExtraText, setShowExtraText] = useState(false); // New state to show extra text
  const [hidePreviousTextAndButton, setHidePreviousTextAndButton] = useState(false); // New state to hide previous text and button after click
  const [showYesNoButtons, setShowYesNoButtons] = useState(false); // State for showing Yes/No buttons
  const [showNewMessage, setShowNewMessage] = useState(false); // State for new message after "Haan Heltini" button click
  const [showInputBox, setShowInputBox] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showHaayeButton, setShowHaayeButton] = useState(false);
  const [showImage, setShowImage] = useState(false); // State to show image after Haaye button
  const audioRef = useRef(null); // Ref for initial audio
  const backgroundAudioRef = useRef(null); // Ref for background music

  const messages = [
    "AMI TOMAAKE BHALO BASHI MY CUTIE😍😍", // Bengali
    "ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ ಗುರು❤️💕", // Kannada
    "నేను నిన్ను ప్రేమిస్తున్నాను😘😘", // Telugu
    "MAIN TUMSE BOHOTH PYAAR KARTI HOON IDIOT😊😊", // Hindi
    "I LOVE U BABBESSSS💖", // English
  ]; // The messages in different languages

  const handleClick = () => {
    setShowMessage(true);
    setShowButton(false);

    if (audioRef.current) {
      audioRef.current.play();
    }

    startTypingEffect();
  };

  const startTypingEffect = () => {
    setTypewriterText("");
    typeWriterEffect(messages[currentLanguageIndex], 0);
  };

  const typeWriterEffect = (message, index) => {
    if (index < message.length && !allMessagesTyped) {
      setTypewriterText((prev) => prev + message[index]);
      setTimeout(() => typeWriterEffect(message, index + 1), 150);
    } else if (index === message.length) {
      setTimeout(() => {
        if (currentLanguageIndex < messages.length - 1) {
          setCurrentLanguageIndex((prevIndex) => prevIndex + 1);
        } else {
          setAllMessagesTyped(true);
          // Play the background music once the typing effect is done
          if (backgroundAudioRef.current) {
            backgroundAudioRef.current.play();
          }
        }
      }, 2500);
    }
  };

  const handleAudioEnd = () => {
    setTimeout(() => {
      setShowCanUText(true);
    }, 2000);

    startTypingEffect();
  };

  useEffect(() => {
    if (currentLanguageIndex > 0 && !allMessagesTyped) {
      setTypewriterText("");
      startTypingEffect();
    }
  }, [currentLanguageIndex,allMessagesTyped]);

  useEffect(() => {
    if (showCanUText) {
      setTimeout(() => {
        setShowFinalButton(true);
      }, 3000);
    }
  }, [showCanUText]);

  useEffect(() => {
    if (showFinalButton) {
      setTimeout(() => {
        setShowNewText(true);
      }, 4000);
    }
  }, [showFinalButton]);

  useEffect(() => {
    if (showNewText) {
      setTimeout(() => {
        setShowNewButton(true);
      }, 3000);
    }
  }, [showNewText]);

  const handleNewButtonClick = () => {
    setShowNewText(false);
    setShowNewButton(false);
  };

  useEffect(() => {
    if (showNewText) {
      setShowCanUText(false);
      setShowFinalButton(false);
    }
  }, [showNewText]);

  const handleFinalTextClick = () => {
    setShowNewText(false);
    setShowNewButton(false);
    setShowFinalText(true);
  };

  useEffect(() => {
    if (showFinalText) {
      setTimeout(() => {
        setShowFinalText(false);
        setShowNewFinalText(true);
      }, 5000);
    }
  }, [showFinalText]);

  useEffect(() => {
    if (showNewFinalText) {
      setTimeout(() => {
        setShowFinalButtonAfterSorry(true);
      }, 4000);
    }
  }, [showNewFinalText]);

  const handleFinalButtonClick = () => {
    setShowNewFinalText(false);
    setShowFinalButtonAfterSorry(false);
    setShowImages(true);
  };

  // Countdown effect for "Angandre wait maadu..." button
  useEffect(() => {
    if (showFinalButton && !isCountdownActive) {
      setIsCountdownActive(true); // Start countdown
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
  }, [showFinalButton, isCountdownActive]);

  // Handle the final "➡️" button click
  const handleFinalButtonClickForNewText = () => {
    setShowFinalButtonAfterSorry(false); // Hide the "Sorry Sorry Baby😉" button
    setHidePreviousTextAndButton(true); // Hide previous text and button
    setShowNewFinalText(false); // Hide "Sorry Sorry Baby😉" text
    setTimeout(() => {
      setShowExtraText(true); // Show the new text after 3 seconds
    }, 3000);
  };

  const handleYesClick = () => {
    setShowNewMessage(true);
    setShowExtraText(false);
    setShowYesNoButtons(false)

    // Add any other logic you want when the user clicks Yes
  };

  const handleNoClick = () => {
    alert("Parvagilla.. i'll keep loving you always!!💖");
    // Add any other logic you want when the user clicks No
  };

  // Handle showing Yes/No buttons after the text is displayed
  useEffect(() => {
    if (showExtraText) {
      setTimeout(() => {
        setShowYesNoButtons(true); // Show Yes/No buttons after 3 seconds
      }, 3000);
    }
  }, [showExtraText]);

  // Handle the "Haan Heltini" button click
  const handleHaanHeltiniClick = () => {
    setShowYesNoButtons(false); // Hide the Yes/No buttons
    setShowExtraText(false); // Hide the previous text
    setShowNewMessage(true); // Show the new message
  };

  useEffect(() => {
    if (showNewMessage) {
      setTimeout(() => {
        setShowInputBox(true); // Show the input box after 4 seconds
      }, 4000);
    }
  }, [showNewMessage]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    // Check if the user has typed "I LOVE YOU ZUBERIYA"
    if (e.target.value.toUpperCase() === "I LOVE YOU ZUBERIYA") {
      setTimeout(() => {
        setShowHaayeButton(true); // Show the "Haaye" button after 2 seconds
      }, 2000);
    }
  };

  // Handle showing image after 3 seconds
  useEffect(() => {
    if (showHaayeButton) {
      setTimeout(() => {
        setShowHaayeButton(false); // Hide the "Haaye" button
        setShowNewMessage(false);
        setShowYesNoButtons(false);
        setShowInputBox(false);
        setShowImage(true); // Show the image
      }, 5000); // Show for 3 seconds
    }
  }, [showHaayeButton]);

  return (
    <main className="w-full h-screen flex items-center justify-center bg-black text-white relative">
      <div className="text-center text-white z-10">
        {/* Button to start the sequence */}
        {showButton && (
          <button
            onClick={handleClick}
            className="bg-white text-pink-600 py-2 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-pink-100 transition duration-300"
          >
            Click Me ❤️
          </button>
        )}

        {/* Show the typing effect message */}
        {showMessage && !allMessagesTyped && (
          <div className="mt-8 text-3xl sm:text-4xl md:text-6xl font-bold">
            {typewriterText}
          </div>
        )}

        {/* Show the "can u" text after audio ends */}
        {showCanUText && (
          <div className="mt-8 text-3xl sm:text-4xl md:text-6xl font-bold">
            {canUText}
          </div>
        )}

        {/* Show the final "Click Me" button after 3 seconds */}
        {showFinalButton && (
          <button
            disabled={countdown > 0} // Disable button while countdown is active
            onClick={handleNewButtonClick}
            className="bg-white text-pink-600 py-2 animate-bounce px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-pink-100 transition duration-300 mt-8"
          >
            {countdown >= 0 ? `Angandre Let's dive in😉 in ${countdown}s ...` : "Angandre wait maadu..."}
          </button>
        )}

        {/* Show new text after 4 seconds */}
        {showNewText && (
          <div className="mt-8 text-3xl sm:text-4xl md:text-6xl font-bold">
            Yaako Ashtond Avsraa..?? Tadkollakagalwa.??😒😒
          </div>
        )}

        {/* Show the new "Click Me" button after 3 seconds */}
        {showNewButton && (
          <button
            onClick={handleFinalTextClick}
            className="bg-white text-pink-600 py-2 px-6  animate-pulse rounded-lg text-lg font-semibold shadow-md hover:bg-pink-100 transition duration-300 mt-8"
          >
            sari sari, innu jaasti kaadsalla bidu..😒 click maadu⬇️
          </button>
        )}

        {/* Show final text after clicking the button */}
        {showFinalText && (
          <div className="mt-8 text-3xl sm:text-4xl md:text-6xl font-bold animate-bounce">
            ULLU BANAYA BADA MAZAA AAYAAA..!!!😂😂😂
          </div>
        )}

        {/* Show the "sorry sorry" text after 5 seconds */}
        {showNewFinalText && (
          <div className="mt-8 text-3xl sm:text-4xl md:text-6xl font-bold">
            Sorry Sorry Baby😉
          </div>
        )}

        {/* Final button to show images after clicking the "Sorry Sorry Baby" */}
        {showFinalButtonAfterSorry && !hidePreviousTextAndButton && (
          <button
            onClick={handleFinalButtonClickForNewText}
            className=" animate-bounce py-2 px-6 rounded-lg text-6xl font-semibold mt-8"
          >
            ➡️
          </button>
        )}

        {/* Show the new extra text after clicking "➡️" */}
        {showExtraText && (
          <div className="mt-8 text-3xl sm:text-4xl md:text-6xl font-bold">
            Nan matra I LOVE YOU helde, Neen Helalwa.🥹?? 
          </div>
        )}

        {/* Show Yes/No buttons after 3 seconds */}
        {showYesNoButtons && (
          <div className="mt-8 animate-bounce">
            <button
              onClick={handleYesClick}
              className="bg-green-600 py-2 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-green-500 transition duration-300 mr-4"
            >
              Haan Heltini..😃
            </button>
            <button
              onClick={handleNoClick}
              className="bg-red-600 py-2 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-red-500 transition duration-300"
            >
              illa Hellala..😠
            </button>
          </div>
        )}

        {/* Show new message after "Haan Heltini" button is clicked */}
        {showNewMessage && (
          <div className="mt-8 text-3xl sm:text-4xl animate-pulse md:text-6xl font-bold">
            Yaayyyy..!😃 En nodtidiya.,"I LOVE YOU ZUBERIYA" helu matte.!!!
          </div>
        )}

        {showInputBox && (
          <div className="mt-8">
            <input
              type="text"
              placeholder="waiting..."
              className="py-2 px-6 rounded-lg text-lg text-white outline-amber-200 outline"
              value={inputValue}
              onChange={handleInputChange} // Track user input
            />
          </div>
        )}

        {/* Show the Haaye button after input is "I LOVE YOU ZUBERIYA" */}
        {showHaayeButton && (
          <button
         
            className="bg-white py-2 px-6 rounded-lg text-lg text-black font-semibold shadow-md hover:bg-pink-100 transition duration-300 mt-8"
          >
            Haaye 😍
            <span className="animate-pulse">💘</span>
          </button>
        )}

        {/* Display an image after the "Haaye" button disappears */}
        {showImage && (
          <div className="mt-8 animate-pulse">
           <Image
  src="/fav.png"
  alt="Your image"
  width={500}
  height={500}
  className="rounded-xl"
/>
          </div>
        )}

        {/* Hidden audio elements */}
        <audio ref={audioRef} onEnded={handleAudioEnd}>
          <source src="/msg.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        {/* Background music */}
        <audio ref={backgroundAudioRef} >
          <source src="/mehbooba.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </main>
  );
}

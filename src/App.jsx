import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const refPassword = useRef(null);

  const generatePassword = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) {
      chars += "0123456789";
    }
    if (includeSymbols) {
      chars += "!@#$%^&*()_+";
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(password);
  }, [length, includeNumbers, includeSymbols, setPassword]);

  const copyPassword = () => {
    refPassword.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSymbols]);

  return (
    <>
      <div className="w-full h-full bg-black fixed flex justify-center">
        <div className="bg-purple-500 w-[500px] h-28 mt-12 px-3 py-2 flex flex-col justify-between">
          <div className="flex flex-wrap justify-between">
            <input
              type="text"
              value={password}
              className="rouded-full outline-none px-3 py-2"
              ref={refPassword}
            />
            <button
              className="bg-orange-300 rounded-lg px-2 text-white"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="flex gap-1 align-middle">
              <input
                type="range"
                min={8}
                max={32}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label className="text-white font-bold">{length}</label>
            </div>
            <div className="flex gap-1 align-middle">
              <input
                type="checkbox"
                value={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <label className="text-white font-bold">Include Numbers</label>
            </div>
            <div className="flex gap-1 align-middle">
              <input
                type="checkbox"
                value={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
              />
              <label className="text-white font-bold">Include Symbols</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

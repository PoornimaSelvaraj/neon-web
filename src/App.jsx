
import React, { useState } from "react";
import "./App.css";

const profiles = [
  {
    id: 1,
    name: "Secure Doggo",
    role: "Lead Security Engineer",
    image: "dog.jpg",
    posts: "52",
    followers: "1.5M",
    following: "982",
    color: "cyan",
  },
  {
    id: 2,
    name: "Cyber Cat",
    role: "Lead Network Engineer",
    image: "cat.jpg",
    posts: "38",
    followers: "980K",
    following: "745",
    color: "pink",
  },
];

function App() {
  const [activeCard, setActiveCard] = useState(1);
  const [followed, setFollowed] = useState({});
  const [followNotice, setFollowNotice] = useState({});
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [messageInput, setMessageInput] = useState("");

  const handleFollow = (profile) => {
    const isFollowing = !followed[profile.id];

    setFollowed((prev) => ({
      ...prev,
      [profile.id]: isFollowing,
    }));

    setFollowNotice((prev) => ({
      ...prev,
      [profile.id]: isFollowing
        ? `You are now following ${profile.name}!`
        : `You unfollowed ${profile.name}.`,
    }));
  };

  const openChat = (profile) => {
    setChatUser(profile.id);
    setMessageInput("");
  };

  const sendMessage = (profileId) => {
    if (!messageInput.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [profileId]: [
        ...(prev[profileId] || []),
        messageInput.trim(),
      ],
    }));

    setMessageInput("");
  };

  return (
    <div className="app-container">
      <div className="cards-wrapper">
        {profiles.map((profile) => {
          const isExpanded = activeCard === profile.id;
          const isFollowing = !!followed[profile.id];

          return (
            <div
              key={profile.id}
              className={`profile-card ${profile.color} ${
                isExpanded ? "expanded" : "compact"
              }`}
              onMouseEnter={() => setActiveCard(profile.id)}
              onMouseLeave={() => {
                setActiveCard(null);
                setChatUser(null);
              }}
              onClick={() => setActiveCard(profile.id)}
            >
              <div className="card-inner">

                <div className="profile-image">
                  <img
                    src={profile.image}
                    alt={profile.name}
                  />
                </div>

                <div className="profile-details">
                  <h2>{profile.name}</h2>
                  <p className="profile-role">{profile.role}</p>

                  {isExpanded && (
                    <>
                      <div className="profile-stats">
                        <div>
                          <strong>{profile.posts}</strong>
                          <span>Posts</span>
                        </div>

                        <div>
                          <strong>{profile.followers}</strong>
                          <span>Followers</span>
                        </div>

                        <div>
                          <strong>{profile.following}</strong>
                          <span>Following</span>
                        </div>
                      </div>

                      <div className="profile-buttons">
                        <button
                          className="follow-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFollow(profile);
                          }}
                        >
                          {isFollowing ? "Following" : "Follow"}
                        </button>

                        <button
                          className="message-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            openChat(profile);
                          }}
                        >
                          Message
                        </button>
                      </div>

                      {followNotice[profile.id] && (
                        <div className="follow-notice">
                          {followNotice[profile.id]}
                        </div>
                      )}

                      {chatUser === profile.id && (
                        <div
                          className="chat-box"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="chat-header">
                            <span>
                              Chat with {profile.name}
                            </span>

                            <button
                              className="close-chat"
                              onClick={() => setChatUser(null)}
                            >
                              ×
                            </button>
                          </div>

                          <div className="chat-messages">
                            <div className="received-message">
                              Hey! How can I help you?
                            </div>

                            {(messages[profile.id] || []).map(
                              (message, index) => (
                                <div
                                  className="sent-message"
                                  key={index}
                                >
                                  {message}
                                </div>
                              )
                            )}
                          </div>

                          <div className="chat-input-area">
                            <input
                              type="text"
                              placeholder="Type a message..."
                              value={messageInput}
                              onChange={(e) =>
                                setMessageInput(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  sendMessage(profile.id);
                                }
                              }}
                            />

                            <button
                              onClick={() =>
                                sendMessage(profile.id)
                              }
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

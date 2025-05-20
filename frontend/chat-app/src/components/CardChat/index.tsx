interface ICardChat {
  isSender: boolean;
  content: string;
  hour: string;
}

const CardChat = ({ isSender, content, hour }: ICardChat) => {
  return (
    <div
      className={`card-chat ${
        isSender ? "card-chat-sender" : "card-chat-receiver"
      }`}
    >
      <p className="card-chat-content">{content}</p>
      <p className="card-chat-hour">{hour}</p>
    </div>
  );
};

export default CardChat;

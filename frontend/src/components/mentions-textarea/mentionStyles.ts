export const mentionsInputStyle = {
    control: {
      
      fontSize: 16,
      lineHeight: "1.5",
    },
    "&multiLine": {
      control: {
        fontFamily: "Inter, sans-serif",
        minHeight: 63,
      },
      highlighter: {
        padding: 9,
        border: "1px solid transparent",
      },
      input: {
        overflow: "auto"
      },
    },
    "&singleLine": {
      display: "inline-block",
      width: 140,
    },
    suggestions: {
        width: 200,
        zIndex: 9997,
        padding: '10px',
        
      list: {
        backgroundColor: "white",
        fontSize: 14,
        position: "absolute",
        zIndex: 9999,
        borderRadius: "4px",
        color: 'gray',
        width: 200,
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
      },
      item: {
        padding: "10px 15px",
        "&focused": {
          backgroundColor: "#F6F6F7",
        },
      },
    },
  };
  
  export const mentionStyle = {
    backgroundColor: "#daf4fa",
  };
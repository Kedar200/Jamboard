
export const sendWebSocketMessage = (socket: { readyState: number; send: (arg0: string) => void; } | null, message: string) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open:", socket?.readyState);
    }
  };

// To handle the drawing data
interface Point {
    x: number;
    y: number;
}

interface DrawingData {
    userId: string;
    tool: string; // Possible values: pen, eraser, highlighter, etc.
    points: Point[];
}

interface DrawingDataMessage {
    type: string;
    data: DrawingData;
}

export const handleDrawingData = (message: { userData: any; points: any; selectedTool: any; }, canvasRef: { current: { width: number; height: number; getContext: (arg0: string) => any; }; } | undefined, drawingContexts: { current: { [x: string]: { canvas: any; }; }; } | undefined) => {
  const { userData, points, selectedTool } = message;
  if (!userData || !userData.name) {
      console.error('Invalid drawing message:', message);
      return;
  }

  const context = drawingContexts.current[userData.name];
  if (!context) {
      console.error('No drawing context found for user:', userData.name);
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = canvasRef.current.width;
      offscreenCanvas.height = canvasRef.current.height;
      drawingContexts.current[userData.name] = offscreenCanvas.getContext('2d');
  } else {
      console.log("Context exists for user:", userData.name);
  }

  drawFromData(context, points, selectedTool);
  const mainContext = canvasRef.current.getContext('2d');
  mainContext.drawImage(drawingContexts.current[userData.name].canvas, 0, 0);
};

export const drawFromData = (context: { canvas?: any; beginPath?: any; moveTo?: any; globalCompositeOperation?: any; lineWidth?: any; lineTo?: any; stroke?: any; closePath?: any; }, points: any[], tool: string) => {
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);

  if (tool === 'eraser') {
      context.globalCompositeOperation = 'destination-out';
      context.lineWidth = 20; // Eraser size
  } else {
      context.globalCompositeOperation = 'source-over';
      context.lineWidth = 1; // Pencil or other tool size
  }

  points.forEach((point: { x: any; y: any; }) => {
      context.lineTo(point.x, point.y);
  });
  context.stroke();
  context.closePath();
  context.globalCompositeOperation = 'source-over'; // Reset to default
};




export const handleUserData = (message: { name: string | number; cursor: any; color: any; }, canvasRef: { current: { width: number; height: number; }; }, drawingContexts: { current: { [x: string]: CanvasRenderingContext2D | null; }; }, setUsers: (arg0: (prevUsers: any) => any) => void, setUserCount: (arg0: (prevCount: any) => any) => void) => {
  console.log('Received user data:', message);
  setUsers((prevUsers: any[]) => {
      const existingUser = prevUsers.find((user: { name: any; }) => user.name === message.name);
      if (existingUser) {
          return prevUsers;
      } else {
          const offscreenCanvas = document.createElement('canvas');
          offscreenCanvas.width = canvasRef.current.width;
          offscreenCanvas.height = canvasRef.current.height;
          drawingContexts.current[message.name] = offscreenCanvas.getContext('2d');
          setUserCount((prevCount: number) => prevCount + 1);
          return [...prevUsers, { name: message.name, cursor: message.cursor || 'default', color: message.color || 'black' }];
      }
  });
};

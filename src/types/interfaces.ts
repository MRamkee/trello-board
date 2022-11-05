export interface Data {
  id: number;
  content?: string;
  cardName: any;
  desc?: string;
}

export interface Props {
  items: Data[];
  cardName: string;
  isDragging: boolean;
  handleDragging: (dragging: boolean) => void;
  handleUpdateList: (id: number, cardName: string) => void;
  updateNewCardData?: (data: Data[]) => void;
}

export interface cardProps {
  cardName: string;
  handleDragging: (dragging: boolean) => void;
  removeTaskFromBoard: (taskId: number) => void;
  onEditTask?: (editedData: Data) => void;
}

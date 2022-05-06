
type TIcon = (props: any) => JSX.Element; 

export interface ICategories {
    id: string;
    title: string;
    icon: TIcon | null;

}

export interface ICategoriesChildren {
    id: string;
    title: string;
}
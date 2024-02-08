export type DocumentsType = {
    _id: string;
    name:string;
    secureUrl: string;
    publicId: string;
    user: string;
    format: string;
}
export type UserType = {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
    accessToken?: string;
    documents?: DocumentsType[];
    results?: string[];
}
export type QuestionType = {
    _id: string;
    question: string;
    options: string[];
    category: string;
};
export type AssessmentType = {
    _id: string;
    title: string;
    questions: QuestionType[];
    passingQuestions: number;
    totalQuestions: number;
    createdAt: Date;
}
export type SelectedOptionsType = {
    questionId: string;
    selectedOption: number;
}
export type CategoryWisePerformanceType = {
    category: string;
    totalQuestions: number;
    correct: number;
    _id: string;
}
export type ResultType = {
    _id:string;
    overall: "PASS" | "FAIL" | "TERMINATED";
    isTerminated: boolean;
    category: "Road" | "Vehicle" | "Medical";
    userId: string;
    __v: number;
    createdAt: Date;
    validTill: Date;
    remarks: string;
    totalQuestions: number;
    correct: number;
    categoryWisePerformance: CategoryWisePerformanceType[];
}
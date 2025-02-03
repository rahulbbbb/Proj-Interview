export interface Loaderprops {
    isLoading?: boolean;
    bgOpacity?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
}

const Loader = ({
    isLoading = false,
    bgOpacity = 1
}: Loaderprops) => {
    if (!isLoading) return <></>;

    return (
        <>
            <div className="absolute w-full flex justify-center items-center left-0 top-0 z-50 h-full" style={{ ["--tw-bg-opacity" as string]: bgOpacity }}>
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 animate-bounce">
                        <div className="w-4 h-4 bg-primary-o-600 rounded-full"></div>
                        <div className="w-4 h-4 bg-status-danger-800 rounded-full"></div>
                        <div className="w-4 h-4 bg-status-warning-800 rounded-full"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { Loader };
import UpdateCoverBtn from "./UpdateCoverBtn.jsx";

export default function Cover({
    url,
    editable
}) {

    return (
        <div className="h-36 overflow-hidden flex justify-center items-center relative">
            <div>
                <img
                    src={url}
                    alt="aggiungi una foto per la copertina "
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />

            </div>

            {editable && (
                <UpdateCoverBtn />
            )}
        </div>
    );
}
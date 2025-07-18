import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';

const downloadContract = <FontAwesomeIcon icon={faCloudArrowDown} />

function BottoneDownloadContratto (props) {

    const action = props.action

    return(
        <>
        <button id="addCarButton" onClick={action} className="flex justify-center items-center py-2 px-3 rounded-lg text-[0.8rem] bg-neutral-100 hover:bg-brand-500 hover:text-neutral-100 text-brand-500" type="button">
            {downloadContract}
        </button>
        </>
    )

}

export default BottoneDownloadContratto
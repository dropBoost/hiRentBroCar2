import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';

const downloadContract = <FontAwesomeIcon icon={faCloudArrowDown} />

function BottoneDownloadContratto (props) {

    const action = props.action

    return(
        <>
        <button id="addCarButton" onClick={action} className="text-md hover:text-neutral-100 text-brand-500 mt-1" type="button">
            {downloadContract}
        </button>
        </>
    )

}

export default BottoneDownloadContratto
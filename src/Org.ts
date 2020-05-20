import { DeployDAO as DeployDAOEvent } from '../generated/DAOFactory/DAOFactory'
import { Kernel as KernelTemplate } from '../generated/templates'

export function handleDeployDAO(event: DeployDAOEvent): void {
  KernelTemplate.create(event.params.dao)
}
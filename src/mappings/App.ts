import { Address } from '@graphprotocol/graph-ts'
import { NewAppProxy as NewAppProxyEvent } from '../../generated/templates/Kernel/Kernel'
import { App as AppEntity } from '../../generated/schema'
import { Organization as OrganizationEntity } from '../../generated/schema'
import { Voting as VotingTemplate } from '../../generated/templates'

const APP_ID = '0x9fa3927f639745e587912d4b0fea7ef9013bf93fb907d29faeab57417ba6e1d4'

function _createCustomAppTemplate(proxyAddress: Address): void {
  VotingTemplate.create(proxyAddress)
}

export function handleNewAppProxy(event: NewAppProxyEvent): void {
  if (event.params.appId.toHexString() == APP_ID) {
    let orgAddress = event.address

    let proxyAddress = event.params.proxy

    let app = new AppEntity(proxyAddress.toHexString())

    app.address = proxyAddress

    let org = OrganizationEntity.load(orgAddress.toHexString())

    let apps = org.apps
    apps.push(app.id)
    org.apps = apps

    org.save()
    app.save()

    _createCustomAppTemplate(proxyAddress)
  }
}

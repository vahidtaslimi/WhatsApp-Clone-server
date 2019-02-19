import { EnumType } from "graphql-toolkit";

enum MessageType {
    LOCATION = 'LOCATION',
    TEXT = 'TEXT',
    PICTURE = 'PICTURE'
}
EnumType({ name: 'MessageType'}) (MessageType);

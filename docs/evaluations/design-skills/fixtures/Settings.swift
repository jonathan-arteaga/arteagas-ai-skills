import SwiftUI
struct SettingsView: View {
    @State private var displayName = "Sam"
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("Account settings").font(.caption)
            Text("Optional newsletter").font(.largeTitle)
            Text("Display name").padding(.bottom, 32)
            TextField("Display name", text: $displayName)
            Text("This name appears on shared projects.")
                .font(.caption).lineLimit(1).frame(width: 110, height: 12)
            Button("Save changes") { }
        }.padding().frame(width: 760)
    }
}

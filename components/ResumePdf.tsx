import { Fragment } from "react";
import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { resumeData, type ContactItem } from "@/data/resume";

// Wrap whole words instead of splitting them with hyphens.
Font.registerHyphenationCallback((word) => [word]);

// PDF layout for /resume.pdf, rendered at build time from data/resume.ts.
// Server-only: react-pdf primitives, not DOM elements.

const SITE = "https://aaronperkel.com";

const color = {
  text: "#1a1a1a",
  muted: "#55606e",
  rule: "#c8cfd8",
  link: "#0f5cc0",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.4,
    color: color.text,
    paddingVertical: 46,
    paddingHorizontal: 54,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 24,
    // lineHeight resolves against the font size it's declared with, so the
    // page-level value must be overridden here or the name overlaps what follows.
    lineHeight: 1.2,
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 2,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
    color: color.muted,
  },
  separator: { marginHorizontal: 7, color: color.rule },
  link: {
    color: color.link,
    textDecoration: "none",
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: color.rule,
    paddingBottom: 3,
    marginTop: 16,
    marginBottom: 8,
  },
  entry: { marginBottom: 8 },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  time: { color: color.muted, fontSize: 9 },
  location: { fontFamily: "Helvetica-Oblique", color: color.muted, marginBottom: 2 },
  bullet: { flexDirection: "row", marginBottom: 1 },
  bulletDot: { width: 12, textAlign: "center" },
  bulletText: { flex: 1 },
  skillsGrid: { flexDirection: "row", flexWrap: "wrap" },
  skillItem: { width: "50%", marginBottom: 2, paddingRight: 12 },
  bold: { fontFamily: "Helvetica-Bold" },
});

// Web labels can be shorthand like "/aaronperkel"; on paper the full
// host/path from the href is more useful, so derive it for http(s) links.
const display = (item: ContactItem) =>
  item.href?.startsWith("http") ? item.href.replace(/^https?:\/\//, "") : item.label;

function ContactLine({ items }: { items: ContactItem[] }) {
  return (
    <View style={styles.contactRow}>
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && <Text style={styles.separator}>•</Text>}
          <Text>
            {item.href ? (
              <Link src={item.href} style={styles.link}>
                {display(item)}
              </Link>
            ) : (
              item.label
            )}
          </Text>
        </Fragment>
      ))}
    </View>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

export default function ResumePdf() {
  const { name, contactInfo, experience, education, skills, projects, honorsAndAwards } =
    resumeData;
  return (
    <Document title={`${name} — Resume`} author={name}>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{name}</Text>
        <ContactLine items={contactInfo.slice(0, 3)} />
        <ContactLine items={contactInfo.slice(3)} />

        <Text style={styles.sectionTitle}>Experience</Text>
        {experience.map((job) => (
          <View key={job.title} style={styles.entry} wrap={false}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{job.title}</Text>
              <Text style={styles.time}>{job.time}</Text>
            </View>
            {job.location && <Text style={styles.location}>{job.location}</Text>}
            {job.details?.map((detail, i) => (
              <Bullet key={i}>{detail}</Bullet>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Education</Text>
        {education.map((edu) => (
          <View key={edu.institution} style={styles.entry}>
            <View style={styles.entryHeader}>
              <Text>
                <Text style={styles.bold}>{edu.institution}</Text>
                {edu.degree ? ` — ${edu.degree}` : ""}
              </Text>
              <Text style={styles.time}>{edu.time}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsGrid}>
          {skills.map((group) => (
            <Text key={group.category} style={styles.skillItem}>
              <Text style={styles.bold}>{group.category}: </Text>
              {group.items.join(", ")}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Projects</Text>
        {projects.map((project) => (
          <Bullet key={project.name}>
            <Link
              src={project.link.startsWith("http") ? project.link : `${SITE}${project.link}`}
              style={styles.link}
            >
              {project.name}
            </Link>
            {project.description ? ` — ${project.description}` : ""}
          </Bullet>
        ))}

        <Text style={styles.sectionTitle}>Honors &amp; Awards</Text>
        {honorsAndAwards.map((honor) => (
          <View key={honor.title} style={styles.entryHeader}>
            <Text>{honor.title}</Text>
            {honor.date && <Text style={styles.time}>{honor.date}</Text>}
          </View>
        ))}
      </Page>
    </Document>
  );
}
